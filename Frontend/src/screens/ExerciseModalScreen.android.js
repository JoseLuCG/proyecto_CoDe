import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { colorStyle } from '../styles/Colors';
import { User } from '../contexts/UserContext';
import * as apiService from '../services/exerciseService';

const { height } = Dimensions.get('window');

export default function ExerciseModalScreen({ isVisible, onClose, exercise, onDelete }) {
    const { token, isGuest } = useContext(User);
    const [editingSetUuid, setEditingSetUuid] = useState(null);
    const [editWeight, setEditWeight] = useState('');
    const [editRepeats, setEditRepeats] = useState('');
    const [editingCardio, setEditingCardio] = useState(false);
    const [editName, setEditName] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editDistance, setEditDistance] = useState('');
    const [editIntensity, setEditIntensity] = useState('');
    const [loading, setLoading] = useState(false);

    const isStrength = exercise?.sets != null;
    const isCardio = exercise?.time != null;
    const category = exercise?.cathegoryName || exercise?.cathegory_name;

    function handleStartEdit(set) {
        setEditingSetUuid(set.uuid_exercise_set);
        setEditWeight(String(set.weight));
        setEditRepeats(String(set.repeats));
    }

    function handleCancelEdit() {
        setEditingSetUuid(null);
        setEditWeight('');
        setEditRepeats('');
    }

    async function handleSaveEdit(uuid) {
        setLoading(true);
        try {
            await apiService.updateExerciseSet(uuid, {
                weight: parseFloat(editWeight),
                repeats: parseInt(editRepeats, 10)
            }, token, isGuest);
            setEditingSetUuid(null);
            setEditWeight('');
            setEditRepeats('');
            if (onDelete) onDelete();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteSet(uuid) {
        setLoading(true);
        try {
            await apiService.deleteExerciseSet(uuid, token, isGuest);
            if (onDelete) onDelete();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteExercise() {
        setLoading(true);
        try {
            if (isStrength) {
                await apiService.deleteStrengthExercise(exercise.uuidExercise, token, isGuest);
            } else if (isCardio) {
                await apiService.deleteCardioExercise(exercise.uuidExercise, token, isGuest);
            }
            if (onDelete) onDelete();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleStartCardioEdit() {
        setEditingCardio(true);
        setEditName(exercise.name || '');
        setEditTime(exercise.time || '');
        setEditDistance(String(exercise.distance || ''));
        setEditIntensity(String(exercise.intensity || ''));
    }

    function handleCancelCardioEdit() {
        setEditingCardio(false);
        setEditName('');
        setEditTime('');
        setEditDistance('');
        setEditIntensity('');
    }

    async function handleSaveCardioEdit() {
        setLoading(true);
        try {
            await apiService.updateCardioExercise(exercise.uuidExercise, {
                exerciseName: editName,
                exerciseTime: editTime,
                exerciseDistance: editDistance,
                exerciseIntensity: editIntensity
            }, token, isGuest);
            setEditingCardio(false);
            setEditName('');
            setEditTime('');
            setEditDistance('');
            setEditIntensity('');
            if (onDelete) onDelete();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
            <View style={styles.modalContent}>
                <View style={styles.modalHandle} />

                <Text style={styles.modalTitle}>{exercise?.name}</Text>

                {isStrength && category ? (
                    <Text style={styles.modalSubtitle}>{category}</Text>
                ) : null}

                {isCardio ? (
                    <View style={styles.cardioContainer}>
                        {editingCardio ? (
                            <>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Nombre</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editName}
                                        onChangeText={setEditName}
                                        placeholder="Nombre"
                                        placeholderTextColor={colorStyle.textInactive}
                                    />
                                </View>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Tiempo</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editTime}
                                        onChangeText={setEditTime}
                                        placeholder="HH:MM:SS"
                                        placeholderTextColor={colorStyle.textInactive}
                                    />
                                </View>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Distancia</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editDistance}
                                        onChangeText={setEditDistance}
                                        keyboardType="number-pad"
                                        placeholder="Km"
                                        placeholderTextColor={colorStyle.textInactive}
                                    />
                                </View>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Intensidad</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editIntensity}
                                        onChangeText={setEditIntensity}
                                        keyboardType="number-pad"
                                        placeholder="%"
                                        placeholderTextColor={colorStyle.textInactive}
                                    />
                                </View>
                                <View style={styles.cardioActions}>
                                    <TouchableOpacity
                                        style={styles.editConfirmBtn}
                                        onPress={handleSaveCardioEdit}
                                        disabled={loading}
                                    >
                                        <Text style={styles.editConfirmText}>{loading ? "..." : "OK"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editCancelBtn} onPress={handleCancelCardioEdit}>
                                        <Text style={styles.editCancelText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Tiempo</Text>
                                    <Text style={styles.cardioValue}>{exercise.time}</Text>
                                </View>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Distancia</Text>
                                    <Text style={styles.cardioValue}>{exercise.distance} Km</Text>
                                </View>
                                <View style={styles.cardioRow}>
                                    <Text style={styles.cardioLabel}>Intensidad</Text>
                                    <Text style={styles.cardioValue}>{exercise.intensity}</Text>
                                </View>
                                <TouchableOpacity style={styles.editBtn} onPress={handleStartCardioEdit}>
                                    <Text style={styles.editBtnText}>Edit</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                ) : null}

                {isStrength ? (
                    <ScrollView style={styles.setsList} contentContainerStyle={styles.setsListContent}>
                        {exercise.sets?.map((s) => (
                            <View key={s.uuid_exercise_set} style={styles.setCard}>
                                {editingSetUuid === s.uuid_exercise_set ? (
                                    <>
                                        <Text style={styles.setNumber}>Set {s.set_number}</Text>
                                        <TextInput
                                            style={styles.editInput}
                                            value={editWeight}
                                            onChangeText={setEditWeight}
                                            keyboardType="number-pad"
                                            placeholder="kg"
                                            placeholderTextColor={colorStyle.textInactive}
                                        />
                                        <TextInput
                                            style={styles.editInput}
                                            value={editRepeats}
                                            onChangeText={setEditRepeats}
                                            keyboardType="number-pad"
                                            placeholder="reps"
                                            placeholderTextColor={colorStyle.textInactive}
                                        />
                                        <TouchableOpacity
                                            style={styles.editConfirmBtn}
                                            onPress={() => handleSaveEdit(s.uuid_exercise_set)}
                                            disabled={loading}
                                        >
                                            <Text style={styles.editConfirmText}>{loading ? "..." : "OK"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.editCancelBtn} onPress={handleCancelEdit}>
                                            <Text style={styles.editCancelText}>X</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.setNumber}>Set {s.set_number}</Text>
                                        <Text style={styles.setData}>{s.weight} kg</Text>
                                        <Text style={styles.setData}>{s.repeats} reps</Text>
                                        <TouchableOpacity style={styles.editBtn} onPress={() => handleStartEdit(s)}>
                                            <Text style={styles.editBtnText}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteSetBtn} onPress={() => handleDeleteSet(s.uuid_exercise_set)}>
                                            <Text style={styles.deleteSetBtnText}>Del</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                ) : null}

                {isStrength || isCardio ? (
                    <TouchableOpacity
                        style={styles.deleteExerciseButton}
                        onPress={handleDeleteExercise}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        <Text style={styles.deleteExerciseButtonText}>Delete Exercise</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.85,
        backgroundColor: colorStyle.bgDark,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
        width: "100%"
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: colorStyle.textInactive,
        borderRadius: 2.5,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: colorStyle.textPrimary,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 16,
        color: colorStyle.textSecondary,
        marginBottom: 16,
    },
    // Cardio styles
    cardioContainer: {
        width: '85%',
        marginTop: 16,
        gap: 12,
    },
    cardioRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    cardioLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: colorStyle.textMuted,
    },
    cardioValue: {
        fontSize: 16,
        fontWeight: '500',
        color: colorStyle.textPrimary,
    },
    cardioActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 8,
    },
    // Strength sets styles
    setsList: {
        width: '85%',
        maxHeight: height * 0.45,
        marginTop: 8,
    },
    setsListContent: {
        paddingBottom: 8,
    },
    setCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
        gap: 6,
    },
    setNumber: {
        color: colorStyle.textMuted,
        fontSize: 13,
        fontWeight: '600',
        minWidth: 42,
    },
    setData: {
        color: colorStyle.textPrimary,
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    // Inline edit
    editInput: {
        flex: 1,
        height: 32,
        backgroundColor: colorStyle.bgCard,
        borderRadius: 12,
        paddingHorizontal: 8,
        fontSize: 13,
        color: colorStyle.textPrimary,
        textAlign: 'center',
    },
    editConfirmBtn: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: colorStyle.mainGradient[0],
    },
    editConfirmText: {
        color: colorStyle.textPrimary,
        fontSize: 12,
        fontWeight: '600',
    },
    editCancelBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    editCancelText: {
        color: colorStyle.textInactive,
        fontSize: 12,
        fontWeight: '600',
    },
    // Set action buttons
    editBtn: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: colorStyle.mainGradient[0] + '60',
    },
    editBtnText: {
        color: colorStyle.textPrimary,
        fontSize: 12,
        fontWeight: '600',
    },
    deleteSetBtn: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#a03030',
    },
    deleteSetBtnText: {
        color: colorStyle.textPrimary,
        fontSize: 12,
        fontWeight: '600',
    },
    // Delete exercise button
    deleteExerciseButton: {
        backgroundColor: '#a03030',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 14,
        marginTop: 20,
    },
    deleteExerciseButtonText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
