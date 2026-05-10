import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, secureTextEntry, keyboardType, centered }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={centered ? styles.labelCentered : styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#bbb"
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
    color: '#555',
    marginBottom: 6,
  },
  labelCentered: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
});

export default InputField;