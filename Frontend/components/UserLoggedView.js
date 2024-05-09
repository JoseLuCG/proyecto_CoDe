import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export function UserLoggedView(props) {
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
        <View>
            <Text>Nombre: Hola</Text>
            <Text>Apellidos: Holaaa</Text>
            <Text>Hola</Text>
            <Text>{mappedFuerzas}</Text>
            <Text>{mappedCardio}</Text>
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
        </View>
    );
}