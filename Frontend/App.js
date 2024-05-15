import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { styles } from './styles/Styles.js';
import { Login } from './components/Login.js';
import { UserLoggedView } from './components/UserLoggedView.js';

import * as fetchController from './controllers/fetchController.js';

export default function App() {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({ name: 'Dario', apellidos: 'Lopez Gomez' });
    const [ejerciciosCardio, setEjerciciosCardio] = useState(new Array);
    const [ejerciciosFuerza, setEjerciciosFuerza] = useState(new Array);

    /**
     * Log Out User
     * @method logoutUser
     */
    function logoutUser() {
        setIndex(0);
    }

    function removeUser(id) {
        fetchController.removeUser(id)
        .then(data=>setIndex(0));
    }

    function removeExercise (id,exerciseDate,exerciseName) {
        fetchController.removeExercise(id,exerciseDate,exerciseName)
        .then(()=>{
            getEjerciciosCardio(id);
            getEjerciciosFuerza(id);
        })
    }

    function getLoginID(loginID) {
        var id = loginID[0].id;
        setIndex(id);
        getEjerciciosCardio(id);
        getEjerciciosFuerza(id);
    }

    /**
     * Fetch Sends userID to Backend/getUserCardio and gets Cardio Exercises to update state
     * @param {*} id ID of logged User
     * @method getCardioExercises
     */
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

    /**
     * Fetch Sends userID to Backend/getUserStrength and gets Strength Exercises to update state
     * @param {*} id 
     * @method getStrengthExercises
     */
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
            <View style={styles.container}>
                <UserLoggedView id={index} userCardio={ejerciciosCardio} userFuerza={ejerciciosFuerza} refreshCardio={() => getEjerciciosCardio(index)} refreshFuerza={() => getEjerciciosFuerza(index)} onClickDeleteExercise={(id,exerciseName,exerciseDate)=>removeExercise(id,exerciseName,exerciseDate)} onClickLogout={()=>logoutUser()} onClickRemoveUser={()=>removeUser(index)} />
            </View>
        );
    }

}
