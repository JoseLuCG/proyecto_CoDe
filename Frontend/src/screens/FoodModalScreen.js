import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { colorStyle } from '../styles/Colors';
import { User } from '../contexts/UserContext';
import * as foodService from '../services/FoodService';

const { height } = Dimensions.get('window');

export default function FoodModalScreen({ isVisible, onClose, food, onDelete }) {
    const { token, isGuest } = useContext(User);
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editKcal, setEditKcal] = useState('');
    const [editProteins, setEditProteins] = useState('');
    const [editFat, setEditFat] = useState('');
    const [editCarbs, setEditCarbs] = useState('');
    const [loading, setLoading] = useState(false);

    function handleStartEdit() {
        setEditing(true);
        setEditName(food?.food_name || '');
        setEditKcal(String(food?.kcal ?? ''));
        setEditProteins(String(food?.proteins ?? ''));
        setEditFat(String(food?.fat ?? ''));
        setEditCarbs(String(food?.carbohydrates ?? ''));
    }

    function handleCancelEdit() {
        setEditing(false);
        setEditName('');
        setEditKcal('');
        setEditProteins('');
        setEditFat('');
        setEditCarbs('');
    }

    async function handleSaveEdit() {
        setLoading(true);
        try {
            await foodService.updateFood(food.uuid_food_intake, {
                foodName: editName,
                kcal: editKcal,
                proteins: editProteins,
                carbohydrates: editCarbs,
                fat: editFat
            }, token, isGuest);
            setEditing(false);
            setEditName('');
            setEditKcal('');
            setEditProteins('');
            setEditFat('');
            setEditCarbs('');
            if (onDelete) onDelete();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteFood() {
        setLoading(true);
        try {
            await foodService.deleteFood(food.uuid_food_intake, token, isGuest);
            if (onDelete) onDelete();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modalContainer}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHandle} />

                <Text style={styles.modalTitle}>{food?.food_name}</Text>

                <View style={styles.foodContainer}>
                    {editing ? (
                        <>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Nombre</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editName}
                                    onChangeText={setEditName}
                                    placeholder="Nombre"
                                    placeholderTextColor={colorStyle.textInactive}
                                />
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Kcal</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editKcal}
                                    onChangeText={setEditKcal}
                                    keyboardType="number-pad"
                                    placeholder="0"
                                    placeholderTextColor={colorStyle.textInactive}
                                />
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Proteinas</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editProteins}
                                    onChangeText={setEditProteins}
                                    keyboardType="decimal-pad"
                                    placeholder="g"
                                    placeholderTextColor={colorStyle.textInactive}
                                />
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Grasas</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editFat}
                                    onChangeText={setEditFat}
                                    keyboardType="decimal-pad"
                                    placeholder="g"
                                    placeholderTextColor={colorStyle.textInactive}
                                />
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Carbohidratos</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editCarbs}
                                    onChangeText={setEditCarbs}
                                    keyboardType="decimal-pad"
                                    placeholder="g"
                                    placeholderTextColor={colorStyle.textInactive}
                                />
                            </View>
                            <View style={styles.foodActions}>
                                <TouchableOpacity
                                    style={styles.editConfirmBtn}
                                    onPress={handleSaveEdit}
                                    disabled={loading}
                                >
                                    <Text style={styles.editConfirmText}>{loading ? "..." : "OK"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.editCancelBtn} onPress={handleCancelEdit}>
                                    <Text style={styles.editCancelText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Kcal</Text>
                                <Text style={styles.foodValue}>{food?.kcal}</Text>
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Proteinas</Text>
                                <Text style={styles.foodValue}>{food?.proteins}g</Text>
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Grasas</Text>
                                <Text style={styles.foodValue}>{food?.fat}g</Text>
                            </View>
                            <View style={styles.foodRow}>
                                <Text style={styles.foodLabel}>Carbohidratos</Text>
                                <Text style={styles.foodValue}>{food?.carbohydrates}g</Text>
                            </View>
                            <TouchableOpacity style={styles.editBtn} onPress={handleStartEdit}>
                                <Text style={styles.editBtnText}>Edit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.deleteFoodButton}
                    onPress={handleDeleteFood}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    <Text style={styles.deleteFoodButtonText}>Delete Food</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: height * 0.85,
        backgroundColor: colorStyle.bgDark,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
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
        marginBottom: 16,
        color: colorStyle.textPrimary,
        textAlign: 'center',
    },
    // Food styles
    foodContainer: {
        width: '85%',
        gap: 10,
    },
    foodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    foodLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: colorStyle.textMuted,
        width: 100,
    },
    foodValue: {
        fontSize: 16,
        fontWeight: '500',
        color: colorStyle.textPrimary,
        flex: 1,
        textAlign: 'right',
    },
    foodActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 8,
    },
    // Inline edit
    editInput: {
        flex: 1,
        height: 36,
        backgroundColor: colorStyle.bgCard,
        borderRadius: 12,
        paddingHorizontal: 10,
        fontSize: 14,
        color: colorStyle.textPrimary,
        textAlign: 'right',
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
    // Edit button
    editBtn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: colorStyle.mainGradient[0] + '60',
        alignSelf: 'center',
        marginTop: 8,
    },
    editBtnText: {
        color: colorStyle.textPrimary,
        fontSize: 12,
        fontWeight: '600',
    },
    // Delete food button
    deleteFoodButton: {
        backgroundColor: '#a03030',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 14,
        marginTop: 20,
    },
    deleteFoodButtonText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
