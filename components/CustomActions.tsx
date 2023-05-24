import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ActionsProps } from 'react-native-gifted-chat';
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomActions = ({ wrapperStyle, iconTextStyle }: ActionsProps) => {
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('User wants to pick an image');
            return;
          case 1:
            console.log('User wants to take a photo');
            return;
          case 2:
            console.log('User wants to send location');
            return;
          default:
        }
      },
    );
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 1,
    backgroundColor: 'transparent',
  },
});
export default CustomActions;
