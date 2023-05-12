import {
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../utils/types";
import { useState } from "react";
import {
  BK_COLOR_1,
  BK_COLOR_2,
  BK_COLOR_3,
  BK_COLOR_4,
} from "../utils/constants";
import ColorButton from "./ColorButton";
import StartChatButton from "./StartChatButton";
import NameInput from "./NameInput";

type StartProps = NativeStackScreenProps<StackParamList, "Start">;

const Start = ({ navigation }: StartProps) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(BK_COLOR_1);

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.appTitle}>Chat App</Text>
        </View>
        <View style={[styles.box, styles.inputBox]}>
          <NameInput setName={setName}></NameInput>
          <View style={styles.boxItem}>
            <Text style={styles.text}>Choose Background Color</Text>
            <View style={styles.colorButtonsContainer}>
              <ColorButton
                color={BK_COLOR_1}
                selected={selectedColor === BK_COLOR_1}
                handleSelect={setSelectedColor}
              ></ColorButton>
              <ColorButton
                color={BK_COLOR_2}
                selected={selectedColor === BK_COLOR_2}
                handleSelect={setSelectedColor}
              ></ColorButton>
              <ColorButton
                color={BK_COLOR_3}
                selected={selectedColor === BK_COLOR_3}
                handleSelect={setSelectedColor}
              ></ColorButton>
              <ColorButton
                color={BK_COLOR_4}
                selected={selectedColor === BK_COLOR_4}
                handleSelect={setSelectedColor}
              ></ColorButton>
            </View>
          </View>
          <StartChatButton
            handlePress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: selectedColor,
              })
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  box: {
    height: "44%",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputBox: {
    backgroundColor: "white",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    padding: 20,
  },
  boxItem: {
    width: "88%",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "rgba(117, 112, 131, 1)",
  },
  colorButtonsContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Start;
