import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/Styles.js';
import { useState } from 'react';
import { Register } from './Register.js';
import * as fetchControllers from '../controllers/fetchController.js'

export function Login(props) {
    const [seRegistra, setSeRegistra] = useState(false);
    const [phone, setPhone] = useState("");
    const [passwd, setPasswd] = useState("");

    function doLogin(passwdIn, phoneIn) {

        fetch("http://localhost:3000/checkLogin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passwd: passwdIn, phoneNumber: phoneIn })
        })
            .then(response => response.json())
            .then(loginID => props.onLoginClick(loginID));
    }


    function doRegister(nombre, apellidos, passwd, phone) {
        fetchControllers.addUser(nombre,apellidos,passwd,phone);
        setSeRegistra(0);

    }

    if (!seRegistra) {
        return (
            <View style={styles.container}>
                <Text><h1>Login</h1></Text>
                <Text>Teléfono</Text>
                <TextInput onChangeText={(text) => setPhone(text)} style={styles.textinput} />
                <Text>Password</Text>
                <TextInput onChangeText={(text) => setPasswd(text)} style={styles.textinput} />
                <Button title='Entrar' onPress={() => doLogin(passwd, phone)}>Entrar</Button>
                <Button title='Registrarse' onPress={() => setSeRegistra(1)}>Registrarse</Button>
            </View>
        );
    } else {
        return (
            <View>
                <Register onClickCrearUsuario={(nombre, apellidos, passwd, phone) => doRegister(nombre, apellidos, passwd, phone)} />
            </View>
        );
    }

}
