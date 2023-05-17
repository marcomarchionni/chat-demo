import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StartProps } from '../types/types';
import { THEME_1, THEME_2, THEME_3, THEME_4 } from '../utils/colors';
import ColorButton from './ColorButton';
import NameInput from './NameInput';
import StartChatButton from './StartChatButton';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }: StartProps) => {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState(THEME_1);

  // Authentication
  const auth = getAuth();

  // Signin anonimously with Firebase Authentication
  const chatLogin = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name,
          theme,
        });
        // Alert.alert('Signed in successfully');
      })
      .catch((error) => {
        Alert.alert('Unable to signin, try later');
      });
  };

  return (
    <ImageBackground
      source={require('../assets/background-image.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
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
                theme={THEME_1}
                selected={theme === THEME_1}
                handleSelect={setTheme}></ColorButton>
              <ColorButton
                theme={THEME_2}
                selected={theme === THEME_2}
                handleSelect={setTheme}></ColorButton>
              <ColorButton
                theme={THEME_3}
                selected={theme === THEME_3}
                handleSelect={setTheme}></ColorButton>
              <ColorButton
                theme={THEME_4}
                selected={theme === THEME_4}
                handleSelect={setTheme}></ColorButton>
            </View>
          </View>
          <StartChatButton handlePress={chatLogin} />
        </View>
      </View>
      {
        /* Fix to avoid to cover text input with keyboard on iOS */
        Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  box: {
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputBox: {
    backgroundColor: 'white',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    padding: 20,
  },
  boxItem: {
    width: '88%',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: 'rgba(117, 112, 131, 1)',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Start;
