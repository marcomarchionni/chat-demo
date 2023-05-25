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

import { getAuth, signInAnonymously } from 'firebase/auth';

import { THEME_1, THEME_2, THEME_3, THEME_4 } from '../utils/colors';
import ColorButton from './ColorButton';
import NameInput from './NameInput';
import StartChatButton from './StartChatButton';
import { StartProps } from '../types/types';

const Start = ({ navigation }: StartProps) => {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState(THEME_1);

  // Firebase Authentication instance
  const auth = getAuth();

  // Sign in anonymously with Firebase Authentication
  const chatLogin = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name,
          theme,
        });
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
        <View style={[styles.box, styles.titleBox]}>
          <Text style={styles.appTitle}>Chat</Text>
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
        /* Fix to avoid covering the text input with the keyboard on iOS */
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
    justifyContent: 'space-around',
  },
  box: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputBox: {
    backgroundColor: 'white',
    flexBasis: 280,
  },
  titleBox: {
    flexBasis: '44%',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },
  appTitle: {
    fontSize: 50,
    fontWeight: '800',
    color: '#fff',
    paddingTop: 20,
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
