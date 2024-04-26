import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/Styles.js';
import { useState } from 'react';
import { Register } from './Register.js';
export function Login(props) {
    const [seRegistra, setSeRegistra] = useState(false);
    function doLogin(passwdIn, phoneIn) {

        fetch("http://localhost:3000/loginUser", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                passwd: passwdIn, phone: phoneIn
            })
        })
            .then(response => response.json)
            .then(loginID => props.onLoginClick(loginID));
    }
    function doRegister() {
        fetch("http://localhost:3000/addUser", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Juan', surname: 'gomez', passwd: 'abc123.', phone: '999112233'
            })
        })
        setSeRegistra(0);

    }

    if (!seRegistra) {
        return (
            <View style={styles.container}>
                <Text><h1>Login</h1></Text>
                <Text>Teléfono</Text>
                <TextInput style={styles.textinput} />
                <Text>Password</Text>
                <TextInput style={styles.textinput} />
                <Button title='Entrar' onPress={() => doLogin()}>Entrar</Button>
                <Button title='Registrarse' onPress={() => setSeRegistra(1)}>Registrarse</Button>
            </View>
        );
    } else {
        return (
            <View>
                <Register onClickCrearUsuario={() => doRegister()} />
            </View>
        );
    }

}
