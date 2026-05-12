import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import AddCardioForm from "./addCardioForm";
import AddStrengthForm from "./addStrengthForm";
import { colorStyle } from "../../styles/Colors";

export default function AddExerciseDataModal({ date, onClose }) {
    const [selectedType, setSelectedType] = useState("");

    if (selectedType == "CARDIO") {
        return <AddCardioForm date={date} onClose={onClose} />;
    }

    if (selectedType == "SRENGTH") {
        return <AddStrengthForm date={date} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select exercise type</Text>
            <TouchableOpacity
                style={[styles.typeButton, { backgroundColor: colorStyle.mainGradient[0] }]}
                onPress={() => setSelectedType("CARDIO")}
                activeOpacity={0.8}
            >
                <Text style={styles.typeButtonText}>Cardio</Text>
                <Text style={styles.typeButtonSubtext}>Record time, distance & intensity</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.typeButton, { backgroundColor: colorStyle.mainGradient[1] }]}
                onPress={() => setSelectedType("SRENGTH")}
                activeOpacity={0.8}
            >
                <Text style={styles.typeButtonText}>Strength</Text>
                <Text style={styles.typeButtonSubtext}>Log sets, weight & reps</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 24,
    },
    typeButton: {
        width: '85%',
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    typeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    typeButtonSubtext: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
});