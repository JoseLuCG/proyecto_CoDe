import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { colorStyle } from '../styles/Colors';
import { User } from '../contexts/UserContext';
import * as cathegoryService from "../services/cathegoryService";

export const CathegoriesDropdown = ({ onCategorySelect, selectedCategory }) => {
    const { token } = useContext(User);
    const [cathegories, setCathegories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const animProgress = useSharedValue(0);

    useEffect(() => {
        animProgress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
    }, [isOpen]);

    const animatedButtonStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animProgress.value,
            [0, 1],
            [colorStyle.mainGradient[0], colorStyle.bgDark]
        ),
        borderBottomLeftRadius: animProgress.value === 1 ? 0 : 20,
        borderBottomRightRadius: animProgress.value === 1 ? 0 : 20,
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animProgress.value,
            [0, 1],
            [colorStyle.textPrimary, colorStyle.mainGradient[0]]
        ),
    }));

    async function loadCategories() {
        try {
            const data = await cathegoryService.getCathegories(token);
            setCathegories(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function toggle() {
        if (isOpen) {
            setIsOpen(false);
            setShowInput(false);
            return;
        }
        await loadCategories();
        setIsOpen(true);
    }

    async function handleAddCategory() {
        const name = newCategoryName.trim();
        if (!name) return;
        try {
            await cathegoryService.addCathegory(name, token);
            setNewCategoryName('');
            setShowInput(false);
            await loadCategories();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.button, animatedButtonStyle]}>
                <TouchableOpacity onPress={toggle} activeOpacity={0.8}>
                    <Animated.Text style={[styles.buttonText, animatedTextStyle]}>Categories</Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            {isOpen && (
                <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutUp.duration(150)} style={styles.dropdown}>
                    <TouchableOpacity
                        style={[styles.dropdownItem, !selectedCategory && styles.dropdownItemActive]}
                        onPress={() => {
                            onCategorySelect?.(null);
                            setIsOpen(false);
                        }}
                    >
                        <Text style={styles.dropdownItemText}>All categories</Text>
                    </TouchableOpacity>
                    {cathegories.length > 0 ? (
                        cathegories.map((cat) => (
                            <TouchableOpacity
                                key={cat.uuid_cathegory}
                                style={[styles.dropdownItem, selectedCategory?.uuid_cathegory === cat.uuid_cathegory && styles.dropdownItemActive]}
                                onPress={() => {
                                    onCategorySelect?.(
                                        selectedCategory?.uuid_cathegory === cat.uuid_cathegory ? null : cat
                                    );
                                    setIsOpen(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>{cat.cathegory_name}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.dropdownEmpty}>No categories available</Text>
                    )}
                    <View style={styles.addSection}>
                        {showInput ? (
                            <View style={styles.addInputRow}>
                                <TextInput
                                    style={styles.addInput}
                                    value={newCategoryName}
                                    onChangeText={setNewCategoryName}
                                    placeholder="Category name"
                                    placeholderTextColor={colorStyle.textInactive}
                                    autoFocus
                                />
                                <TouchableOpacity style={styles.addConfirmBtn} onPress={handleAddCategory}>
                                    <Text style={styles.addConfirmText}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addCancelBtn} onPress={() => { setShowInput(false); setNewCategoryName(''); }}>
                                    <Text style={styles.addCancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.addButton} onPress={() => setShowInput(true)}>
                                <Text style={styles.addButtonText}>+ Add category</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 300,
        marginBottom: 10,
        marginTop: 5,
        zIndex: 10,
    },
    button: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: colorStyle.textPrimary,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: colorStyle.bgDark,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 8,
        minWidth: 200,
        maxHeight: 200,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colorStyle.mainGradient[0] + '40',
    },
    dropdownItem: {
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 4,
    },
    dropdownItemActive: {
        backgroundColor: colorStyle.mainGradient[0],
    },
    dropdownItemText: {
        color: colorStyle.textPrimary,
        fontSize: 14,
    },
    dropdownEmpty: {
        color: colorStyle.textInactive,
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 14,
    },
    addSection: {
        borderTopWidth: 1,
        borderTopColor: colorStyle.mainGradient[0] + '40',
        marginTop: 4,
        paddingTop: 8,
    },
    addButton: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: colorStyle.mainGradient[0],
        fontSize: 14,
        fontWeight: '600',
    },
    addInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    addInput: {
        flex: 1,
        height: 36,
        backgroundColor: colorStyle.bgCard,
        borderRadius: 20,
        paddingHorizontal: 12,
        fontSize: 14,
        color: colorStyle.textPrimary,
    },
    addConfirmBtn: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    addConfirmText: {
        color: colorStyle.textPrimary,
        fontWeight: '600',
        fontSize: 13,
    },
    addCancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    addCancelText: {
        color: colorStyle.textInactive,
        fontSize: 13,
    },
});
