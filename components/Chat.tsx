import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { StackParamList } from "../utils/types";
import { useEffect } from "react";

type ChatProps = NativeStackScreenProps<StackParamList, "Chat">;

const Chat = ({ route, navigation }: ChatProps) => {
  const { name, backgroundColor } = route.params;

  // Set the name chose by the user as screen title
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    // The background color is set according to the user's choice
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
