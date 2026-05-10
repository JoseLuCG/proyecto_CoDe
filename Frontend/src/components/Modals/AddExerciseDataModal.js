import { useContext } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Text, View } from "react-native";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import WorkoutSwitch from "../WorkoutSwitch";
import * as apiService from "./../../services/exerciseService";
import { User } from '../../contexts/UserContext';
import SavedSetInfoDisplay from "./SavedSetInfoDisplay";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { textStyle } from "../../styles/TextStyles";
import AddCardioForm from "./addCardioForm";
import AddStrengthForm from "./addStrengthForm";

const { width } = Dimensions.get('window');

export default function AddExerciseDataModal({ date }) {
    // States:
    const { user } = useContext(User);
    const [selectedType, setSelectedType] = useState("");

    // Handlers:
    function handleTypeChange(value) {
        setSelectedType(value);
    }
    /*
    useEffect(
        () => {
            
        }, [selectedType]
    );
    */
    if (selectedType == "CARDIO") {
        return (
            <AddCardioForm date={date} />
        );
    }

    if (selectedType == "SRENGTH") {
        return (
            <AddStrengthForm date={date} />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={textStyle.text}>Select the type of exercise to record:</Text>
                <TouchableOpacity style={styles.eitherButton} onPress={() => handleTypeChange("CARDIO")}>
                    <Text style={styles.buttonText}>CARDIO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eitherButton} onPress={() => handleTypeChange("SRENGTH")}>
                    <Text style={styles.buttonText}>STRENGTH</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //width: width * 0.95,
    },
    textHeader: {

    },
    textContainer: {
        marginTop: 20,
        display: "flex",
        alignItems: 'center',
    },
    eitherButton: {
        backgroundColor: '#1563ac88',
        width: 190,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});