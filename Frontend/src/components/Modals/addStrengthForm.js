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

const { width } = Dimensions.get('window');

export default function AddStrengthForm({ date, onClose }) {
    // States:
    const { user, token } = useContext(User);
    const [exerciseData, setExerciseData] = useState({
        exerciseUser: "",
        exerciseName: "",
        exerciseDate: "",
        set: {
            setNumber: 1,
            setWeight: "",
            setRepeats: ""
        }
    });

    // Handlers:
    function handleInputChange(fieldName, value) {
        setExerciseData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }

    function handleSetChange(field, value) {
        setExerciseData(prevState => ({
            ...prevState,
            set: {
                ...prevState.set,
                [field]: value
            }
        }));
    }

    async function submitForm() {
        try {
            const response = await apiService.addStrengthExecise(exerciseData, token);
            
            if (response.ok) {
                setExerciseData(prevState => ({
                    ...prevState,
                    exerciseSetNumber: prevState.exerciseSetNumber + 1,
                    exerciseWeight: "",
                    exerciseRepeats: ""
                }));
            }
        } catch (error) {
            throw new Error("Something is wrong");
            // TODO: add conditionals for the diferents use cases if the user don't work
            console.error(error);
        }

    }

    useEffect(() => {
        handleInputChange("exerciseDate", date.format('DD-MM-YYYY'));
        handleInputChange("exerciseUser", user.uuidUser);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {/* Exercise name */}
                <InputField
                    label="Exercise name:"
                    value={exerciseData.exerciseName}
                    onChangeText={(text) => handleInputChange("exerciseName", text)}
                    keyboardType="text-pad"
                    centered={true}
                />

                {/* Exercise set data: */}
                <View style={styles.setDataField}>
                    <View style={styles.setInfoField}>
                        <InputField
                            label="Weight:"
                            value={exerciseData.set}
                            onChangeText={(text) => handleSetChange("setWeight", text)}
                            keyboardType="number-pad"
                            centered={true}
                        />
                    </View>
                    <View style={styles.setInfoField}>
                        <InputField
                            label="Repeats:"
                            value={exerciseData.set}
                            onChangeText={(text) => handleSetChange("setRepeats", text)}
                            keyboardType="number-pad"
                            centered={true}
                        />
                    </View>
                </View>

                {/* AddSet Button */}
                <View style={styles.addSetButtonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={submitForm}>
                        <Text style={styles.buttonText}>ADD SET</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Sava button }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={submitForm}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        //backgroundColor: "rgba(9, 9, 9, 0.31)",
    },
    formContainer: {
        width: width * 0.90,
        marginTop: 20,
        display: "flex",
        alignItems: "center"
    },
    setDataField: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    setInfoField: {
        width: "40%",
    },
    addSetButtonContainer: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        //backgroundColor: "rgba(9, 9, 9, 0.31)",
        marginRight: width * 0.05
    },
    intensityField: {
        width: 160
    },
    saveButton: {
        backgroundColor: '#1563ac88',
        width: 100,
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
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center"
    }
});

/*
    return (
        <KeyboardAwareScrollView
            bottomOffset={50}
            enableOnAndroid={true}
            contentContainerStyle={styles.content}
        >
            <View style={styles.container}>
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
                            keyboardType="text-pad"
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
                        null
                        :
                        <InputField
                            label="Intensity:"
                            value={exerciseData.exerciseIntensity}
                            onChangeText={(text) => handleInputChange("exerciseIntensity", text)}
                            keyboardType="phone-pad"
                        />
                }
                {
                    exerciseData.exerciseType ? <SavedSetInfoDisplay /> : null
                }
                <TouchableOpacity style={styles.addButton} onPress={submitForm}>
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>

    );
*/