import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { borderRadius, defaultBRadius } from '../styles/DefaultVaules';

const InputField = ({ label, value, onChangeText, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "main-font"
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: defaultBRadius,
    paddingLeft: 10,
    fontFamily: "main-font",
    backgroundColor: "#FFF"
  },
});

export default InputField;