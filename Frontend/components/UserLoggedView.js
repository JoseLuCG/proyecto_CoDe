import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {styles} from '../styles/Styles.js';
import * as fetchController from '../controllers/fetchController.js';

export function UserLoggedView(props) {
    
    function addCardio(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
        fetchController.addCardio(props.id,tipo,fecha,intensidadOset,tiempoOpeso,distanciaOrepeticiones)
        .then(data => {
                props.refreshCardio();
            });
    }

    function addFuerza(tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
        fetchController.addFuerza(props.id,tipo,fecha,intensidadOset,tiempoOpeso,distanciaOrepeticiones)
            .then(data => {
                props.refreshFuerza();
            })
    }


    const objetoCardio = props.userCardio;
    const objetoFuerza = props.userFuerza;

    const mappedFuerzas = objetoFuerza.map((obj) => {
        return (
            <ExerciseFuerza onClickDelete={()=>props.onClickDeleteExercise(props.id,obj.exerciseDate,obj.exerciseName)} id={props.id} exerciseName={obj.exerciseName} exerciseDate={obj.exerciseDate} weight={obj.weight} repeats={obj.repeats} setNumber={obj.setNumber} />
        )
    });

    const mappedCardio = objetoCardio.map((obj) => {
        return (
            <View>
                <ExerciseCardio onClickDelete={()=>props.onClickDeleteExercise(props.id,obj.exerciseDate,obj.exerciseName)} id={props.id} exerciseName={obj.exerciseName} exerciseDate={obj.exerciseDate} intensity={obj.intensity} distance={obj.distance} />
            </View>
        )
    });

    return (
        <View>
            <Text>TÚ: {props.name} {props.lastName}, {props.phone}</Text>
            <br />
            <Text>{mappedFuerzas}</Text>
            <Text>{mappedCardio}</Text>
            <AnhadirEjercicioCardioFuerza clickAddCardio={(t, f, i, tt, d) => addCardio(t, f, i, tt, d)} clickAddFuerza={(t, f, i, tt, d) => addFuerza(t, f, i, tt, d)} />
            <Button title="LOGOUT" onPress={()=>props.onClickLogout()}/>
            <br />
            <Button title="Borrar Usuario" onPress={()=>props.onClickRemoveUser()}/>
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
            <Button title='Eliminar' onPress={()=>{props.onClickDelete()}}/>
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
            <Button title="Eliminar" onPress={()=>{props.onClickDelete()}} />
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