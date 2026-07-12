import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ActivityIndicator, TextInput } from "react-native";
import InputField from "../InputField";
import * as apiService from "./../../services/exerciseService";
import * as cathegoryService from "./../../services/cathegoryService";
import * as presetService from "./../../services/exercisePresetService";
import { User } from '../../contexts/UserContext';
import { colorStyle } from "../../styles/Colors";

export default function AddStrengthForm({ date }) {
    const { user, token } = useContext(User);
    const [cathegories, setCathegories] = useState([]);
    const [step, setStep] = useState('category');
    const [selectedCathegory, setSelectedCathegory] = useState(null);
    const [presets, setPresets] = useState([]);
    const [loadingPresets, setLoadingPresets] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingCategory, setAddingCategory] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        exerciseUser: "",
        exerciseName: "",
        exerciseDate: "",
        uuidCathegory: "",
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

    async function handleAddCategory() {
        const name = newCategoryName.trim();
        if (!name) return;
        setAddingCategory(true);
        try {
            await cathegoryService.addCathegory(name, token);
            setNewCategoryName('');
            setShowAddCategory(false);
            const updated = await cathegoryService.getCathegories(token);
            setCathegories(updated);
            const newCat = updated.find(c => c.cathegory_name === name);
            if (newCat) {
                handleCategorySelect(newCat);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setAddingCategory(false);
        }
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

    async function handleCategorySelect(cat) {
        setSelectedCathegory(cat);
        handleInputChange("uuidCathegory", cat.uuid_cathegory);
        setStep('presets');
        setLoadingPresets(true);
        try {
            const data = await presetService.getPresets("strength", cat.uuid_cathegory, user.uuidUser, token);
            setPresets(data);
        } catch (error) {
            console.error(error);
            setPresets([]);
        } finally {
            setLoadingPresets(false);
        }
    }

    function handlePresetSelect(preset) {
        handleInputChange("exerciseName", preset.exercise_name);
        setStep('details');
    }

    function handleCustomExercise() {
        handleInputChange("exerciseName", "");
        setStep('details');
    }

    useEffect(() => {
        handleInputChange("exerciseDate", date.format('DD-MM-YYYY'));
        handleInputChange("exerciseUser", user.uuidUser);
        cathegoryService.getCathegories(token)
            .then(setCathegories)
            .catch(console.error);
    }, []);

    if (step === 'category') {
        return (
            <View style={styles.container}>
                <Text style={styles.stepTitle}>Select a category</Text>
                <ScrollView style={styles.pickerList}>
                    {cathegories.map((cat) => (
                        <TouchableOpacity
                            key={cat.uuid_cathegory}
                            style={styles.pickerItem}
                            onPress={() => handleCategorySelect(cat)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.pickerItemText}>{cat.cathegory_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.addCategorySection}>
                    {showAddCategory ? (
                        <View style={styles.addCategoryRow}>
                            <TextInput
                                style={styles.addCategoryInput}
                                value={newCategoryName}
                                onChangeText={setNewCategoryName}
                                placeholder="Category name"
                                placeholderTextColor={colorStyle.textInactive}
                                autoFocus
                            />
                            <TouchableOpacity
                                style={styles.addCategoryConfirmBtn}
                                onPress={handleAddCategory}
                                disabled={addingCategory}
                            >
                                <Text style={styles.addCategoryConfirmText}>{addingCategory ? "..." : "Add"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.addCategoryCancelBtn}
                                onPress={() => { setShowAddCategory(false); setNewCategoryName(''); }}
                            >
                                <Text style={styles.addCategoryCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.addCategoryButton} onPress={() => setShowAddCategory(true)}>
                            <Text style={styles.addCategoryButtonText}>+ Add category</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    if (step === 'presets') {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setStep('category')} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{"< Back"}</Text>
                </TouchableOpacity>
                <Text style={styles.stepTitle}>
                    {selectedCathegory ? selectedCathegory.cathegory_name : ""} exercises
                </Text>
                {loadingPresets ? (
                    <ActivityIndicator size="large" color={colorStyle.mainGradient[0]} />
                ) : (
                    <ScrollView style={styles.pickerList}>
                        {presets.length > 0 ? (
                            presets.map((preset) => (
                                <TouchableOpacity
                                    key={preset.uuid_exercise_preset}
                                    style={styles.pickerItem}
                                    onPress={() => handlePresetSelect(preset)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.pickerItemText}>{preset.exercise_name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>No hay ejercicios de esta categoría disponibles</Text>
                        )}
                        <TouchableOpacity
                            style={[styles.customButton, { backgroundColor: colorStyle.mainGradient[1] }]}
                            onPress={handleCustomExercise}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.customButtonText}>Custom exercise</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setStep('presets')} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"< Back"}</Text>
            </TouchableOpacity>
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
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colorStyle.textPrimary,
        marginBottom: 16,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginBottom: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    backButtonText: {
        color: colorStyle.mainGradient[0],
        fontSize: 16,
        fontWeight: '600',
    },
    pickerList: {
        width: '85%',
        maxHeight: 300,
    },
    pickerItem: {
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    pickerItemText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    customButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 8,
        alignItems: 'center',
    },
    customButtonText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    emptyText: {
        color: colorStyle.textInactive,
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 20,
        fontStyle: 'italic',
    },
    addCategorySection: {
        width: '85%',
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: colorStyle.mainGradient[0] + '40',
        paddingTop: 8,
    },
    addCategoryButton: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    addCategoryButtonText: {
        color: colorStyle.mainGradient[0],
        fontSize: 14,
        fontWeight: '600',
    },
    addCategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    addCategoryInput: {
        flex: 1,
        height: 36,
        backgroundColor: colorStyle.bgCard,
        borderRadius: 20,
        paddingHorizontal: 12,
        fontSize: 14,
        color: colorStyle.textPrimary,
    },
    addCategoryConfirmBtn: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    addCategoryConfirmText: {
        color: colorStyle.textPrimary,
        fontWeight: '600',
        fontSize: 13,
    },
    addCategoryCancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    addCategoryCancelText: {
        color: colorStyle.textInactive,
        fontSize: 13,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colorStyle.textMuted,
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
        color: colorStyle.textPrimary,
    },
});
