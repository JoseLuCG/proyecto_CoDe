import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {styles} from '../styles/Styles.js';

export function UserLoggedView(props) {
    /**
     * Fetch Add a new Cardio Exercise to User on Backend/addUserCardioExercise
     * @param {*} tipo Cardio Type
     * @param {*} fecha Cardio Date
     * @param {*} intensidadOset Cardio Intensity
     * @param {*} tiempoOpeso Cardio Time
     * @param {*} distanciaOrepeticiones Cardio Distance
     * @method addCardio
     */
    function addCardio(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exerciseDate: fecha, idUser: props.id, exerciseName: tipo, intensity: intensidadOset, exerciseTime: tiempoOpeso, distance: distanciaOrepeticiones })
        };
        fetch("http://localhost:3000/addUserCardioExercise", requestOptions)
            .then((response) => response.json)
            .then(data => {
                props.refreshCardio();
            })
    }

    /**
     * Fetch Add a new Strength Exercise to User on Backend/addUserStrengthExercise
     * @param {*} tipo Strength Type
     * @param {*} fecha Strength Date
     * @param {*} intensidadOset Strength Set
     * @param {*} tiempoOpeso Strength Weight
     * @param {*} distanciaOrepeticiones Strength Repetitions
     * @method addStrength
     */
    function addFuerza(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exerciseDate: fecha, idUser: props.id, exerciseName: tipo, setNumber: intensidadOset, weight: tiempoOpeso, repeats: distanciaOrepeticiones })
        };
        fetch("http://localhost:3000/addUserStrengthExercise", requestOptions)
            .then((response) => response.json)
            .then(data => {
                props.refreshFuerza();
            })
    }


    const objetoCardio = props.userCardio;
    const objetoFuerza = props.userFuerza;

    const mappedFuerzas = objetoFuerza.map((obj) => {
        return (
            <ExerciseFuerza exerciseName={obj.exerciseName} exerciseDate={obj.exerciseDate} weight={obj.weight} repeats={obj.repeats} setNumber={obj.setNumber} />
        )
    });

    const mappedCardio = objetoCardio.map((obj) => {
        return (
            <View>
                <ExerciseCardio exerciseName={obj.exerciseName} exerciseDate={obj.exerciseDate} intensity={obj.intensity} distance={obj.distance} />
            </View>
        )
    });

    return (
        <View style={styles.container}>
            <Text>Nombre: Hola</Text>
            <Text>Apellidos: Holaaa</Text>
            <Text>Hola</Text>
            <Text>{mappedFuerzas}</Text>
            <Text>{mappedCardio}</Text>
            <AnhadirEjercicioCardioFuerza clickAddCardio={(t, f, i, tt, d) => addCardio(t, f, i, tt, d)} clickAddFuerza={(t, f, i, tt, d) => addFuerza(t, f, i, tt, d)} />
            <Button title="LOGOUT" />
        </View>
    );
}






export function ExerciseFuerza(props) {
    return (
        <View>
            <Text>Fuerza Tipo: {props.exerciseName}</Text>
            <Text>Fecha: {props.exerciseDate}</Text>
            <Text>Peso: {props.weight}</Text>
            <Text>Repeticiones: {props.repeats}</Text>
            <Text>Numero Sets: {props.setNumber}</Text>
            <Button title='Eliminar' />
        </View>
    );
}

export function ExerciseCardio(props) {
    return (
        <View>
            <Text>Cardio Tipo: {props.exerciseName}</Text>
            <Text>Fecha: {props.exerciseDate}</Text>
            <Text>Intensidad: {props.intensity}</Text>
            <Text>Distancia: {props.distance}</Text>
            <Button title="Eliminar" />
        </View>
    );
}






export function AnhadirEjercicioCardioFuerza(props) {
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [intensidadOset, setIntensidadOset] = useState(0);
    const [tiempoOpeso, setTiempoOpeso] = useState(0);
    const [distanciaOrepeticiones, setDistanciaOrepeticiones] = useState(0);

    return (
        <View>
            <Text><h1>Añadir Ejercicio</h1></Text>
            <Text>Tipo:</Text>
            <TextInput style={styles.textinput} onChangeText={(text) => setTipo(text)} />
            <Text>Fecha: |Year-month-day|</Text>
            <TextInput style={styles.textinput} onChangeText={(text) => setFecha(text)} />
            <Text>Intensidad o Set:</Text>
            <TextInput style={styles.textinput} onChangeText={(text) => setIntensidadOset(text)} />
            <Text>Tiempo o Peso</Text>
            <TextInput style={styles.textinput} onChangeText={(text) => setTiempoOpeso(text)} />
            <Text>Distancia o Repeticiones:</Text>
            <TextInput style={styles.textinput} onChangeText={(text) => setDistanciaOrepeticiones(text)} />
            <Button title="Add Cardio" onPress={() => props.clickAddCardio(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones)} />
            <Button title="Add Fuerza" onPress={() => props.clickAddFuerza(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones)} />
        </View>
    );

}