import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colorStyle } from '../styles/Colors';

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
        placeholderTextColor={colorStyle.textInactive}
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
    color: colorStyle.textSecondary,
    marginBottom: 6,
  },
  labelCentered: {
    fontSize: 14,
    fontWeight: '600',
    color: colorStyle.textSecondary,
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: colorStyle.bgCard,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colorStyle.textPrimary,
    backgroundColor: colorStyle.bgCard,
  },
});

export default InputField;