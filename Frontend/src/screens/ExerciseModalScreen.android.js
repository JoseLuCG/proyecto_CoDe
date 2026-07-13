import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colorStyle } from '../styles/Colors';

const { height } = Dimensions.get('window');

export default function ExerciseModalScreen({ isVisible, onClose, exercise }) {
    const isStrength = exercise?.sets != null;
    const isCardio = exercise?.time != null;
    const category = exercise?.cathegoryName || exercise?.cathegory_name;

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
                    </View>
                ) : null}

                {isStrength ? (
                    <ScrollView style={styles.setsList} contentContainerStyle={styles.setsListContent}>
                        {exercise.sets?.map((s) => (
                            <View key={s.uuid_exercise_set} style={styles.setCard}>
                                <Text style={styles.setNumber}>Set {s.set_number}</Text>
                                <Text style={styles.setData}>{s.weight} kg</Text>
                                <Text style={styles.setData}>{s.repeats} reps</Text>
                            </View>
                        ))}
                    </ScrollView>
                ) : null}

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
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
    // Strength sets styles
    setsList: {
        width: '85%',
        maxHeight: height * 0.5,
        marginTop: 8,
    },
    setsListContent: {
        paddingBottom: 8,
    },
    setCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    setNumber: {
        color: colorStyle.textMuted,
        fontSize: 14,
        fontWeight: '600',
        minWidth: 50,
    },
    setData: {
        color: colorStyle.textPrimary,
        fontSize: 15,
        flex: 1,
        textAlign: 'center',
    },
    // Action buttons
    actionsRow: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    editButton: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 14,
    },
    editButtonText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#a03030',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 14,
    },
    deleteButtonText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
