import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { StackParamList } from "../utils/types";
import { useEffect, useState } from "react";
import { GiftedChat, IMessage} from 'react-native-gifted-chat';

type ChatProps = NativeStackScreenProps<StackParamList, "Chat">;

const Chat = ({ route, navigation }: ChatProps) => {
  const { name, backgroundColor } = route.params;
  const [ messages, setMessages ] = useState<IMessage[]>()

  useEffect(() => {
    // Set the name chose by the user as screen title
    navigation.setOptions({ title: name });
    // Init static message
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages)=> GiftedChat.append(previousMessages, newMessages))
  }

  return (
    // The background color is set according to the user's choice
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat 
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: 1}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
