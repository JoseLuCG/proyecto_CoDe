import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export function UserLoggedView() {
    return (
        <View>
            <Text>Nombre: </Text>
            <Text>Apellidos: </Text>
            <ExerciseFuerza />
            <ExerciseCardio />
        </View>
    );
}

export function ExerciseFuerza() {
    return (
        <View>
            <Text>Fuerza Tipo: </Text>
            <Text>Fecha: </Text>
            <Text>Peso: </Text>
            <Text>Repeticiones: </Text>
        </View>
    );
}

export function ExerciseCardio() {
    return (
        <View>
            <Text>Cardio Tipo: </Text>
            <Text>Fecha: </Text>
            <Text>Intensidad: </Text>
            <Text>Distancia: </Text>
        </View>
    );
}