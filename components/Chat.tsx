import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  ActionsProps,
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import { ChatProps } from '../types/types';
import {
  isArrayOfIMessage,
  mapToMessage as mapDataToMessage,
} from '../utils/utils';
import { Unsubscribe } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleError } from '../errors/error-handling';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected }: ChatProps) => {
  const { userID, name, theme } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  const cacheMessages = async (messagesToCache: IMessage[]) => {
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
      if (isArrayOfIMessage(cachedMessages)) {
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
      // Unregister current listener
      if (unsubMessages) unsubMessages();

      // Define Firestore query
      const firestoreQuery = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'desc'),
      );

      // Setup new listener
      unsubMessages = onSnapshot(firestoreQuery, (documentSnapshot) => {
        let newMessages: IMessage[] = [];
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
      // Unregister listener on unmount
      unsubMessages && unsubMessages();
    };
  }, [isConnected]);

  const onSend = (newMessages: IMessage[]) => {
    // Add messages to Firestore
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Customize bubble colors based on the chosen theme
  const renderBubble = (props: BubbleProps<IMessage>) => {
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

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else return null;
  };

  const renderCustomActions = (props: ActionsProps) => {
    return <CustomActions {...props} />;
  };

  return (
    // Set the background color according to the chosen theme
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        onSend={(messages) => onSend(messages)}
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
