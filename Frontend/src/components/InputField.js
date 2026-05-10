import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { defaultBRadius } from '../styles/DefaultVaules';

const InputField = ({ label, value, onChangeText, secureTextEntry, keyboardType, centered }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={centered?styles.labelCentered : styles.label}>{label}</Text>
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
    width: "90%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "main-font",
  },
  labelCentered: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "main-font",
    textAlign: "center"
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: defaultBRadius,
    padding: 10,
    fontFamily: "main-font",
    backgroundColor: "#FFF",
  },
});

export default InputField;