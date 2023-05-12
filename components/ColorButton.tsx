import { View, TouchableOpacity, StyleSheet } from "react-native";

interface ColorButtonProps {
  color: string;
  selected: boolean;
  handleSelect: (color: string) => void;
}
const ColorButton = ({ color, selected, handleSelect }: ColorButtonProps) => {
  const getButtonStyle = () => {
    return [
      styles.outerButton,
      selected && { borderColor: color, borderWidth: 2 },
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => handleSelect(color)}
    >
      <View style={[styles.innerButton, { backgroundColor: color }]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginRight: 16,
  },
  innerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ColorButton;
