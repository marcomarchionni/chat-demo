import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { handleError } from '../errors/error-handling';
import { CustomActionsProps } from '../types/types';

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  storage,
  userID,
  onSend,
}: CustomActionsProps) => {
  const actionSheet = useActionSheet();

  // Generate unique reference to store image in Firebase Storage
  const generateReference = (uri: string) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageUri: string) => {
    // Convert image to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Upload image to Firebase storage
    const uniqueRefString = generateReference(imageUri);
    const newUploadRef = ref(storage, uniqueRefString);
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log('File has been uploaded successfully');
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Send message with image url
      onSend({ image: imageUrl });
    });
  };

  // Pick image from media library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissions haven't been granted");
    }
  };

  const takePhoto = async () => {
    try {
      const permissions = await ImagePicker.requestCameraPermissionsAsync();
      console.log(permissions);
      if (permissions && permissions.granted) {
        const result = await ImagePicker.launchCameraAsync();
        if (!result?.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        }
      } else {
        Alert.alert("Permissions haven't been granted");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const sendLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert('Error occurred while fetching location');
    } else Alert.alert("Permissions haven't been granted.");
  };

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
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            sendLocation();
            return;
          default:
        }
      },
    );
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="View Actions"
      accessibilityHint="Choose if you want to upload an image, take a photo or share your location"
      accessibilityRole="button">
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
