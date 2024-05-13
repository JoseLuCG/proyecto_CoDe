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

    /**
     * Fetch Sends userId to remove from users on Backend/removeUser
     * @param {*} id userId needed to remove user
     * @method removeUser
     */
    function borrarUsuario(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        fetch("http://localhost:3000/removeUser", requestOptions)
            .then(response => response.json())
            .then(data => setIndex(0));
    }

    /**
     * Log Out User
     * @method logoutUser
     */
    function logoutUser() {
        setIndex(0);
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

    /**
     * Fetch sends ExerciseDate, idUser and exerciseName to Delete exercise on Backend/removeUserExercise
     * @param {*} exerciseDate the date of the exercise
     * @param {*} idUser The Id of actual User
     * @param {*} exerciseName The name of the Exercise
     * @method removeExercise
     */
    function removeEjercicio(exerciseDate, idUser, exerciseName) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: idUser, exerciseName: exerciseName, exerciseDate: exerciseDate })
        };
        fetch("http://localhost:3000/removeEjercicio", requestOptions)
            .then(response => response.json())
            .then(data => {
                getEjerciciosCardio(index);
                getEjerciciosFuerza(index);
            });
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
