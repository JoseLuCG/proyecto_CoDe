import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { colorStyle } from '../styles/Colors';

const { height } = Dimensions.get('window');

export default function ExerciseModalScreen({ isVisible, onClose, exercise }) {
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
                <Text style={styles.modalTitle}>{exercise?.exerciseName}</Text>
                <Text style={styles.modalSubtitle}>Repeticiones: {exercise?.numberOfReps}</Text>
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
        marginBottom: 10,
        color: colorStyle.textPrimary,
    },
    modalSubtitle: {
        fontSize: 18,
        color: colorStyle.textSecondary,
    },
});
