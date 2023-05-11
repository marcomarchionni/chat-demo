import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { StackParamList } from "../types";
import { useEffect } from "react";

type ChatProps = NativeStackScreenProps<StackParamList, "Chat">;

const Chat = ({ route, navigation }: ChatProps) => {
  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
