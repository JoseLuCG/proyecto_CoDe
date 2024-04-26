import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/Styles.js';
export function Login() {
  function doLogin () {

  }
  function doRegister () {
    fetch ("http://localhost:3000/addUser", {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
      })
    }) 
      
      
  }
  return (
    <View style={styles.container}>
      <Text><h1>Login</h1></Text>
      <Text>Teléfono</Text>
      <TextInput style={styles.textinput} />
      <Text>Password</Text>
      <TextInput style={styles.textinput} />
      <Button title='Entrar'>Entrar</Button>
      <Button title='Registrarse'>Registrarse</Button>
    </View>
  );
}
