import { useContext, useEffect, useState } from "react";
import {
    StyleSheet, TouchableOpacity, Text, View,
    Keyboard, TouchableWithoutFeedback, ScrollView,
    ActivityIndicator, Dimensions
} from "react-native";
import InputField from "../InputField";
import * as apiService from "./../../services/exerciseService";
import * as presetService from "./../../services/exercisePresetService";
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
    const { user, token, isGuest } = useContext(User);
    const [exerciseData, setExerciseData] = useState(INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [presets, setPresets] = useState([]);
    const [loadingPresets, setLoadingPresets] = useState(true);

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

    function handlePresetSelect(preset) {
        handleInputChange("exerciseName", preset.exercise_name);
    }

    async function submitForm() {
        if (!exerciseData.exerciseName.trim()) {
            setErrorMessage("Exercise name is required");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        try {
            await apiService.addCardioExercise(exerciseData, token, isGuest);
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
        presetService.getPresets("cardio", null, token, isGuest)
            .then(setPresets)
            .catch(console.error)
            .finally(() => setLoadingPresets(false));
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {loadingPresets ? (
                        <ActivityIndicator size="small" color={colorStyle.mainGradient[0]} />
                    ) : presets.length > 0 ? (
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionLabel}>Quick select</Text>
                            <View style={styles.presetRow}>
                                {presets.map((preset) => (
                                    <TouchableOpacity
                                        key={preset.uuid_exercise_preset}
                                        style={[
                                            styles.presetChip,
                                            exerciseData.exerciseName === preset.exercise_name && styles.presetChipActive
                                        ]}
                                        onPress={() => handlePresetSelect(preset)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[
                                            styles.presetChipText,
                                            exerciseData.exerciseName === preset.exercise_name && styles.presetChipTextActive
                                        ]}>{preset.exercise_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ) : null}

                    <View style={styles.sectionCardname}>
                        <Text style={styles.sectionLabel}>Exercise name</Text>
                        <InputField
                            label=""
                            value={exerciseData.exerciseName}
                            onChangeText={(text) => handleInputChange("exerciseName", text)}
                            keyboardType="text-pad"
                            containerStyle={styles.exerciseNameInput}
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
                            <ActivityIndicator color={colorStyle.textPrimary} size="small" />
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
        width: "100%"
    },
    container: {
        width: '100%',
        alignSelf: 'center',
        paddingTop: 8,
    },
    sectionCard: {
        width: '100%',
        backgroundColor: colorStyle.bgCard,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        alignSelf: 'center',
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colorStyle.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    presetRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    presetChip: {
        backgroundColor: colorStyle.mainGradient[0] + '25',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colorStyle.mainGradient[0] + '40',
    },
    presetChipActive: {
        backgroundColor: colorStyle.mainGradient[0],
        borderColor: colorStyle.mainGradient[0],
    },
    presetChipText: {
        color: colorStyle.textPrimary,
        fontSize: 14,
        fontWeight: '500',
    },
    presetChipTextActive: {
        color: colorStyle.textPrimary,
        fontWeight: '700',
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
        color: colorStyle.textInactive,
        marginHorizontal: 4,
    },
    metricField: {
        flex: 1,
        alignItems: 'center',
    },
    metricSpacer: {
        width: 12,
    },
    exerciseNameInput: {
        width: '100%',
    },
    errorText: {
        color: colorStyle.error,
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
        alignSelf: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colorStyle.textPrimary,
    },
});
