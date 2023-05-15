import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { DARK_GREY } from "../utils/constants";

interface StartChatButtonProps {
  handlePress: () => void;
}

const StartChatButton = ({ handlePress }: StartChatButtonProps) => {
  return (
    <TouchableOpacity style={styles.startChatButton} onPress={handlePress}>
      <Text style={styles.buttonText}>Start Chatting</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startChatButton: {
    width: "88%",
    height: 56,
    backgroundColor: DARK_GREY,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default StartChatButton;
