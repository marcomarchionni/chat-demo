import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { userIcon } from './Icons';
import { DARK_GREY } from '../utils/colors';

interface NameInputProps {
  setName: Dispatch<SetStateAction<string>>;
}

const NameInput = ({ setName }: NameInputProps) => {
  const [text, setText] = useState('');
  const handleTextChange = (value: string) => {
    setText(value);
    setName(value);
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 10 }}>
        <SvgXml xml={userIcon} width={16} height={16} />
      </View>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={handleTextChange}
        placeholder="Your name"
        placeholderTextColor={'rgba(117, 112, 131, 0.5)'}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DARK_GREY,
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: '300',
  },
});

export default NameInput;
