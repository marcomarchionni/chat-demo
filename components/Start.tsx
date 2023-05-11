import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { useState } from "react";

type StartProps = NativeStackScreenProps<StackParamList, "Start">;

const Start = ({ navigation }: StartProps) => {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <Text>Welcome to Chat App</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Type your username here"
      ></TextInput>

      <Button
        title="Start Chatting"
        onPress={() => navigation.navigate("Chat", { name: name })}
      ></Button>
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
  textInput: {
    width: "88%",
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Start;
