import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { styles } from './styles/Styles.js';
import { Login } from './components/Login.js';
import { UserLoggedView } from './components/UserLoggedView.js';

export default function App() {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({ name: 'Dario', apellidos: 'Lopez Gomez' });
    const [ejerciciosCardio, setEjerciciosCardio] = useState(new Array);
    const [ejerciciosFuerza, setEjerciciosFuerza] = useState(new Array);

    let entraVentanaLogin = false;
    function entraLoggedView() {
        setIndex(7)
    }
    //  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
    function getLoginID(loginID) {
        var id = loginID[0].id;
        setIndex(id);
        getEjerciciosCardio(id);
        getEjerciciosFuerza(id);
    }
    function getEjerciciosCardio(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        fetch("http://localhost:3000/getUserCardio", requestOptions)
            .then(response => response.json())
            .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
    }

    function getEjerciciosFuerza(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        fetch("http://localhost:3000/getUserFuerza", requestOptions)
            .then(response => response.json())
            .then(ejerciciosFuerza => setEjerciciosFuerza(ejerciciosFuerza));
    }

    if (index == 0) {
        return (
            <View style={styles.container}>
                <Login onLoginClick={(loginID) => getLoginID(loginID)} />
                <StatusBar style="auto" />
            </View>
        );
    } else {
        return (
            <View>
                <UserLoggedView id={index} userCardio={ejerciciosCardio} userFuerza={ejerciciosFuerza} refreshCardio={() => getEjerciciosCardio(index)} refreshFuerza={() => getEjerciciosFuerza(index)} />
            </View>
        );
    }

}
