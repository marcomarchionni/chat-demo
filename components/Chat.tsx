import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Unsubscribe } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import {
  ChatMessage,
  ChatProps,
  RenderCustomActionsProps,
} from '../types/types';
import { isArrayOfChatMessage, mapDataToMessage } from '../utils/utils';
import { handleError } from '../errors/error-handling';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, storage, isConnected }: ChatProps) => {
  const { userID, name, theme } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const cacheMessages = async (messagesToCache: ChatMessage[]) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      handleError(error);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const stringifiedMessages = await AsyncStorage.getItem('messages');
      const cachedMessages =
        stringifiedMessages && JSON.parse(stringifiedMessages);
      if (isArrayOfChatMessage(cachedMessages)) {
        return cachedMessages;
      } else {
        return [];
      }
    } catch (error) {
      handleError(error);
      return [];
    }
  };

  let unsubMessages: Unsubscribe;

  useEffect(() => {
    // Set the user-chosen name as the screen title
    navigation.setOptions({ title: name });

    if (isConnected) {
      // Unregister current Firestore listener
      if (unsubMessages) unsubMessages();

      // Define Firestore query
      const firestoreQuery = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'desc'),
      );

      // Setup new listener
      unsubMessages = onSnapshot(firestoreQuery, (documentSnapshot) => {
        let newMessages: ChatMessage[] = [];
        documentSnapshot.forEach((doc) => {
          const message = mapDataToMessage(doc.id, doc.data());
          newMessages.push(message);
        });
        setMessages(newMessages);
        cacheMessages(newMessages);
      });
    } else {
      loadCachedMessages().then((messages) => setMessages(messages));
    }
    return () => {
      // Unregister Firestore listener on unmount
      unsubMessages && unsubMessages();
    };
  }, [isConnected]);

  const addMessages = (newMessages: ChatMessage[]) => {
    // Add messages to Firestore
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Customize bubble colors based on the chosen theme
  const renderBubble = (props: BubbleProps<ChatMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.bubbleRight,
          },
          left: {
            backgroundColor: theme.bubbleLeft,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: InputToolbarProps<ChatMessage>) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      // Hide Input Toolbar when offline
      return null;
    }
  };

  const renderCustomActions = (props: RenderCustomActionsProps) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props: Readonly<BubbleProps<ChatMessage>>) => {
    const { currentMessage } = props;
    if (currentMessage?.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    // Set background color according to the chosen theme
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => addMessages(messages)}
        user={{ _id: userID, name }}
      />
      {
        /* Avoid the keyboard covering messages on older Android devices */
        Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
