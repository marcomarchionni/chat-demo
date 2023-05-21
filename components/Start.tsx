import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { THEME_1, THEME_2, THEME_3, THEME_4 } from '../utils/colors';
import { StackParamList } from '../utils/types';
import ColorButton from './ColorButton';
import NameInput from './NameInput';
import StartChatButton from './StartChatButton';

type StartProps = NativeStackScreenProps<StackParamList, 'Start'>;

const Start = ({ navigation }: StartProps) => {
  const [name, setName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(THEME_1);

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
                selected={selectedTheme === THEME_1}
                handleSelect={setSelectedTheme}></ColorButton>
              <ColorButton
                theme={THEME_2}
                selected={selectedTheme === THEME_2}
                handleSelect={setSelectedTheme}></ColorButton>
              <ColorButton
                theme={THEME_3}
                selected={selectedTheme === THEME_3}
                handleSelect={setSelectedTheme}></ColorButton>
              <ColorButton
                theme={THEME_4}
                selected={selectedTheme === THEME_4}
                handleSelect={setSelectedTheme}></ColorButton>
            </View>
          </View>
          <StartChatButton
            handlePress={() =>
              navigation.navigate('Chat', {
                name: name,
                theme: selectedTheme,
              })
            }
          />
        </View>
      </View>
      {
        /* Fix to avoid to cover input with keyboard on iOS */
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
