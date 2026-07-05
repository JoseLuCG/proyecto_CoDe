import { useContext, useEffect, useState } from "react";
import {
    StyleSheet, TouchableOpacity, Text, View,
    Keyboard, TouchableWithoutFeedback, ScrollView,
    ActivityIndicator,
    Dimensions
} from "react-native";
import InputField from "../InputField";
import * as apiService from "./../../services/exerciseService";
import { User } from '../../contexts/UserContext';
import { colorStyle } from "../../styles/Colors";

const {width} = Dimensions.get('window');
const INITIAL_STATE = {
    exerciseUser: "",
    exerciseName: "",
    exerciseDate: "",
    exerciseIntensity: "",
    exerciseDistance: "",
    exerciseTime: {
        hours: "",
        minutes: "",
        seconds: ""
    }
};

export default function AddCardioForm({ date, onClose }) {
    const { user, token } = useContext(User);
    const [exerciseData, setExerciseData] = useState(INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleInputChange(fieldName, value) {
        setExerciseData(prev => ({ ...prev, [fieldName]: value }));
        setErrorMessage("");
    }

    function handleTimeChange(field, value) {
        setExerciseData(prev => ({
            ...prev,
            exerciseTime: { ...prev.exerciseTime, [field]: value }
        }));
        setErrorMessage("");
    }

    async function submitForm() {
        if (!exerciseData.exerciseName.trim()) {
            setErrorMessage("Exercise name is required");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        try {
            await apiService.addCardioExercise(exerciseData, token);
            setExerciseData(INITIAL_STATE);
            onClose();
        } catch (error) {
            setErrorMessage(error.message || "Failed to save exercise");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleInputChange("exerciseDate", date.format('DD-MM-YYYY'));
        handleInputChange("exerciseUser", user.uuidUser);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionLabel}>Exercise name</Text>
                        <InputField
                            label=""
                            value={exerciseData.exerciseName}
                            onChangeText={(text) => handleInputChange("exerciseName", text)}
                            keyboardType="text-pad"
                        />
                    </View>

                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionLabel}>Time</Text>
                        <View style={styles.row}>
                            <View style={styles.timeField}>
                                <InputField
                                    label="HH"
                                    value={exerciseData.exerciseTime.hours}
                                    onChangeText={(text) => handleTimeChange("hours", text)}
                                    keyboardType="number-pad"
                                    centered={true}
                                />
                            </View>
                            <Text style={styles.colon}>:</Text>
                            <View style={styles.timeField}>
                                <InputField
                                    label="MM"
                                    value={exerciseData.exerciseTime.minutes}
                                    onChangeText={(text) => handleTimeChange("minutes", text)}
                                    keyboardType="number-pad"
                                    centered={true}
                                />
                            </View>
                            <Text style={styles.colon}>:</Text>
                            <View style={styles.timeField}>
                                <InputField
                                    label="SS"
                                    value={exerciseData.exerciseTime.seconds}
                                    onChangeText={(text) => handleTimeChange("seconds", text)}
                                    keyboardType="number-pad"
                                    centered={true}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionLabel}>Metrics</Text>
                        <View style={styles.row}>
                            <View style={styles.metricField}>
                                <InputField
                                    label="Distance (Km)"
                                    value={exerciseData.exerciseDistance}
                                    onChangeText={(text) => handleInputChange("exerciseDistance", text)}
                                    keyboardType="number-pad"
                                    centered={true}
                                />
                            </View>
                            <View style={styles.metricSpacer} />
                            <View style={styles.metricField}>
                                <InputField
                                    label="Intensity (%)"
                                    value={exerciseData.exerciseIntensity}
                                    onChangeText={(text) => handleInputChange("exerciseIntensity", text)}
                                    keyboardType="number-pad"
                                    centered={true}
                                />
                            </View>
                        </View>
                    </View>

                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: colorStyle.mainGradient[0] }]}
                        onPress={submitForm}
                        activeOpacity={0.8}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
        width: width
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        paddingTop: 8,
    },
    sectionCard: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#aaa',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    timeField: {
        flex: 1,
        alignItems: 'center',
    },
    colon: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ccc',
        marginHorizontal: 4,
    },
    metricField: {
        flex: 1,
        alignItems: 'center',
    },
    metricSpacer: {
        width: 12,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 14,
        marginTop: 4,
        marginBottom: 8,
        textAlign: 'center',
    },
    saveButton: {
        width: '90%',
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});