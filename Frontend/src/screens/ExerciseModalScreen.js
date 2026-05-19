import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { colorStyle } from '../styles/Colors';

const { height } = Dimensions.get('window');

export default function ExerciseModalScreen({ isVisible, onClose, exercise }) {
    if (!exercise) return null;

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
                <Text style={styles.modalTitle}>{exercise.exerciseName}</Text>
                <Text style={styles.modalSubtitle}>Repeticiones: {exercise.numberOfReps}</Text>
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
        backgroundColor: '#1A1A2E',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#6B6B8D',
        borderRadius: 2.5,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    modalSubtitle: {
        fontSize: 18,
        color: '#B0B0C8',
    },
});