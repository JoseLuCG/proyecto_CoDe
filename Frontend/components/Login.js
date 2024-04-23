import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>Telefono</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Button>Entrar</Button>
      <Button>Registrarse</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
