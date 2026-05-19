import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import InputField from "../InputField";
import * as apiService from "./../../services/exerciseService";
import { User } from '../../contexts/UserContext';
import { colorStyle } from "../../styles/Colors";

export default function AddStrengthForm({ date }) {
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

    function handleInputChange(fieldName, value) {
        setExerciseData(prev => ({ ...prev, [fieldName]: value }));
    }

    function handleSetChange(field, value) {
        setExerciseData(prev => ({
            ...prev,
            set: { ...prev.set, [field]: value }
        }));
    }

    async function submitForm() {
        try {
            const response = await apiService.addStrengthExecise(exerciseData, token);
            if (response.ok) {
                setExerciseData(prev => ({
                    ...prev,
                    set: { setNumber: prev.set.setNumber + 1, setWeight: "", setRepeats: "" }
                }));
            }
        } catch (error) {
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
                <InputField
                    label="Exercise name"
                    value={exerciseData.exerciseName}
                    onChangeText={(text) => handleInputChange("exerciseName", text)}
                    keyboardType="text-pad"
                    centered={true}
                />

                <Text style={styles.sectionLabel}>Set {exerciseData.set.setNumber}</Text>
                <View style={styles.row}>
                    <View style={styles.setField}>
                        <InputField
                            label="Weight (kg)"
                            value={exerciseData.set.setWeight}
                            onChangeText={(text) => handleSetChange("setWeight", text)}
                            keyboardType="number-pad"
                            centered={true}
                        />
                    </View>
                    <View style={styles.setField}>
                        <InputField
                            label="Repeats"
                            value={exerciseData.set.setRepeats}
                            onChangeText={(text) => handleSetChange("setRepeats", text)}
                            keyboardType="number-pad"
                            centered={true}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: colorStyle.mainGradient[0] }]}
                    onPress={submitForm}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Add Set</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8888AA',
        textTransform: 'uppercase',
        letterSpacing: 1,
        alignSelf: 'flex-start',
        marginLeft: '7.5%',
        marginTop: 8,
        marginBottom: 4,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setField: {
        flex: 1,
        maxWidth: '40%',
    },
    saveButton: {
        width: '85%',
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
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