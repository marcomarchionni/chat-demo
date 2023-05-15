import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from 'react-native-gifted-chat';
import { StackParamList } from '../utils/types';

type ChatProps = NativeStackScreenProps<StackParamList, 'Chat'>;

const Chat = ({ route, navigation }: ChatProps) => {
  const { name, theme } = route.params;
  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    // Set the name chose by the user as screen title
    navigation.setOptions({ title: name });

    // Init static message
    setMessages([
      {
        _id: 1,
        text: 'Hello developer, how can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Welcome to the Chat Room!',
        createdAt: new Date(),
        system: true,
        user: { _id: 0 },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  // Render bubble colors according to chosen theme
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
    // Background color is set according to the chosen theme
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
      />
      {
        /* Avoid keyboard to cover messages on old Androids */
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
