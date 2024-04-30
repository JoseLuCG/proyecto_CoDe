import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { styles } from './styles/Styles.js';
import { Login } from './components/Login.js';
import { UserLoggedView } from './components/UserLoggedView.js';

export default function App() {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({ name: 'Dario', apellidos: 'Lopez Gomez' });
    const [ejerciciosCardio, setEjerciciosCardio] = useState(0);
    const [ejerciciosFuerza, setEjerciciosFuerza] = useState(0);

    //  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
    function getLoginID(loginID) {
        setIndex(loginID.id);
        console.log(loginID.id);
        fetch("https://www.localhost:3000/getUserIdData")
            .then(response => response.json())
            .then(userData => setUser(userData));
    }
    function getEjerciciosCardio() {
        fetch("https://www.localhost:3000")
            .then(response => response.json())
            .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
    }

    function getEjerciciosFuerza() {
        fetch("https://www.localhost:3000")
            .then(response => response.json())
            .then(ejerciciosCardio => setEjerciciosCardio(ejerciciosCardio));
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
                <UserLoggedView />
            </View>
        );
    }

}
