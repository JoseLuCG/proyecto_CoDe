import { useContext } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Text } from "react-native";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import WorkoutSwitch from "../WorkoutSwitch";
import * as apiService from "./../../services/exerciseService";
import { User } from '../../contexts/UserContext';

const { width } = Dimensions.get('window');

export default function AddExerciseDataModal({date}) {
    // States:
    const [ user ] = useContext(User);
    const [exerciseData, setExerciseData] = useState({
        exerciseUser: "",
        exerciseName: "",
        exerciseType: false,
        exerciseDate: "",
        exerciseIntensity: "",
        exerciseTime: "",
        exerciseDistance: "",
        exerciseSetNumber: "",
        exerciseWeight: "",
        exerciseRepeats: ""
    });

    // Handlers:
    function handleInputChange(fieldName, value) {
        setExerciseData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }

    async function submitForm() {
        try {           
            const response = await apiService.addCardioExercise(exerciseData);
        } catch (error) {
            throw new Error("Something is wrong");
            // TODO: add conditionals for the diferents use cases if the user don't work
            console.error(error);
        }

    }

    useEffect(()=> {
        handleInputChange("exerciseDate", date.format('DD-MM-YYYY'));
        handleInputChange("exerciseUser", user.uuidUser);
	}, []);    

    return (
        <ScrollView style={styles.container}>
            <InputField
                label="Exercise name:"
                value={exerciseData.exerciseName}
                onChangeText={(text) => handleInputChange("exerciseName", text)}
                keyboardType="text-pad"
            />

            <WorkoutSwitch
                exerciseType={exerciseData.exerciseType}
                setExerciseType={(value) => handleInputChange('exerciseType', value)}
            />

            {
                exerciseData.exerciseType ?
                    // Strenght Input
                    <InputField
                        label="Weight:"
                        value={exerciseData.exerciseWeight}
                        onChangeText={(text) => handleInputChange("exerciseWeight", text)}
                        keyboardType="phone-pad"
                    />
                    :
                    // Cardio Input
                    <InputField
                        label="Time:"
                        value={exerciseData.exerciseTime}
                        onChangeText={(text) => handleInputChange("exerciseTime", text)}
                        keyboardType="phone-pad"
                    />
            }

            {
                exerciseData.exerciseType ?
                    <InputField
                        label="Repeats:"
                        value={exerciseData.exerciseRepeats}
                        onChangeText={(text) => handleInputChange("exerciseRepeats", text)}
                        keyboardType="phone-pad"
                    />
                    :
                    <InputField
                        label="Distance:"
                        value={exerciseData.exerciseDistance}
                        onChangeText={(text) => handleInputChange("exerciseDistance", text)}
                        keyboardType="phone-pad"
                    />
            }

            {
                exerciseData.exerciseType ?
                    <InputField
                        label="Add new set"
                        value={exerciseData.exerciseSetNumber}
                        onChangeText={(text) => handleInputChange("exerciseSetNumber", text)}
                        keyboardType="phone-pad"
                    />
                    :
                    <InputField
                        label="Intensity:"
                        value={exerciseData.exerciseIntensity}
                        onChangeText={(text) => handleInputChange("exerciseIntensity", text)}
                        keyboardType="phone-pad"
                    />
            }
            <TouchableOpacity style={styles.addButton} onPress={submitForm}>
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.80,
    }, 
    addButton: {
        backgroundColor: '#1563ac88',
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});