import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, secureTextEntry, keyboardType, centered }) => {
  return (
    <View style={styles.inputContainer}>
      {label ? <Text style={centered ? styles.labelCentered : styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#6B6B8D"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
    width: '90%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B0B0C8',
    marginBottom: 6,
  },
  labelCentered: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B0B0C8',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: '#2A2A4E',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#2A2A4E',
  },
});

export default InputField;