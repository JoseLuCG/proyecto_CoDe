import React, { useState } from 'react';
import { Text, Button, StyleSheet, Pressable} from 'react-native';
import InputField from '../components/InputField';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../styles/Colors';
import { textStyle } from '../styles/TextStyles';
import * as apiService from './../services/AddUserService'
import { defaultBRadius } from '../styles/DefaultVaules';

const RegisterScreen = ({ navigation }) => {
    // States:
    const [ newUser, setNewUser ] = useState({
        userName: "",
        userLastName: "",
        userEmail: "",
        userPhone: "",
        userPassword: ""
    });

    // Handlers
    function handleinputChange(fieldName, value) {
        setNewUser(prevState => ({
            ...prevState,
            [fieldName]:value
        }));
    }

    function backToLogin() {
        navigation.navigate('Login');    
    }
    
    function submitForm() {
        const response = apiService.addUser(newUser);
        alert(JSON.stringify(newUser));

    }

    return (
        <LinearGradient 
            colors={color.mainGradient}
            style={styles.container}
        >
            <Text style={textStyle.title}>¡Únete a nosotros!</Text>
            <InputField
                label="Nombre"
                value={newUser.userName}
                onChangeText={(text)=> handleinputChange("userName", text)}
            />

            <InputField
                label="Apellidos"
                value={newUser.userLastName}
                onChangeText={(text)=> handleinputChange("userLastName", text)}
            />

            <InputField
                label="Correo Electrónico"
                value={newUser.userEmail}
                onChangeText={(text)=> handleinputChange("userEmail", text)}
            />

            <InputField
                label="Número de teléfono"
                value={newUser.userPhone}
                onChangeText={(text)=> handleinputChange("userPhone", text)}
            />

            <InputField
                label="Contraseña"
                value={newUser.userPassword}
                onChangeText={(text)=> handleinputChange("userPassword", text)}
            />
            <Pressable onPress={submitForm} style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
            ]}>
                <Text style={textStyle.button}>Registrarse</Text>
            </Pressable>
            <Button title="Inicia sesión" onPress={backToLogin} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#1DA27A',
        borderRadius: defaultBRadius,
        padding: 10
    },
    buttonPressed: {
        backgroundColor: '#223D35'
    }
});

export default RegisterScreen;