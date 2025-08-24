import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import { loginUser } from '../services/authService';

const RegisterScreen = ({ navigation }) => {
    function backToLogin() {
        navigation.navigate('Login');    
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ventana de registro</Text>
            <Button title="Inicia sesión" onPress={backToLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    link: {
        color: '#007BFF', // Azul típico de enlace
        textDecorationLine: 'underline',
        marginTop: 40,
    },
});

export default RegisterScreen;