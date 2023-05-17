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
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from 'react-native-gifted-chat';
import { ChatProps } from '../types/types';
import { mapToMessage as mapDataToMessage } from '../utils/utils';

const Chat = ({ route, navigation, db }: ChatProps) => {
  const { userID, name, theme } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // Set the name chose by the user as screen title
    navigation.setOptions({ title: name });

    // Define query in Firestore
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages: IMessage[] = [];
      documentSnapshot.forEach((doc) => {
        const message = mapDataToMessage(doc.id, doc.data());
        newMessages.push(message);
      });
      setMessages(newMessages);
    });
    return () => {
      unsubMessages && unsubMessages();
    };
  }, [name]);

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

  return (
    // Set the background color according to the chosen theme
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
