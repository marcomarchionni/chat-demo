import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../utils/types';

interface ColorButtonProps {
  theme: Theme;
  selected: boolean;
  handleSelect: (theme: Theme) => void;
}
const ColorButton = ({ theme, selected, handleSelect }: ColorButtonProps) => {
  const getButtonStyle = () => {
    return [
      styles.outerButton,
      selected && { borderColor: theme.background, borderWidth: 2 },
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => handleSelect(theme)}>
      <View
        style={[
          styles.innerButton,
          { backgroundColor: theme.background },
        ]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 16,
  },
  innerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ColorButton;
