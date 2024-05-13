import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/Styles.js';
import { useState } from 'react';
import { Register } from './Register.js';
export function Login(props) {
    const [seRegistra, setSeRegistra] = useState(false);
    const [phone, setPhone] = useState("");
    const [passwd, setPasswd] = useState("");

    //  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
    /**
     * Fetch Sends Phone and Password to Backend/userLogin and get Login ID to update user Status
     *  @param {*} passwdIn Password to Attempt to Log In
     * @param {*} phoneIn Phone to Attempt to 
     * @method doLogin
     */
    function doLogin(passwdIn, phoneIn) {

        fetch("http://localhost:3000/checkLogin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passwd: passwdIn, phoneNumber: phoneIn })
        })
            .then(response => response.json())
            .then(loginID => props.onLoginClick(loginID));
    }

    /**
     * Fetch Register a new User on Backend/createUser
     * @param {*} nombre Name to create User
     * @param {*} apellidos Surname to create User
     * @param {*} passwd Password to create User
     * @param {*} phone Unique Phone to create User (Primary Key)
     * @method doRegister
     */
    function doRegister(nombre, apellidos, passwd, phone) {
        console.log(nombre);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nameUser: nombre, lastNameUser: apellidos, passwd: passwd, phoneNumber: phone })
        };
        fetch("http://127.0.0.1:3000/addUser", requestOptions)
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
