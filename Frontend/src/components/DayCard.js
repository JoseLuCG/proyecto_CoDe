import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DayCard = ({ day, isSelected, onPress }) => (
    <TouchableOpacity
        onPress={() => onPress(day)}
        style={[styles.card, isSelected && styles.cardSelected]}
    >
        <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
            {day.format('DD')}
        </Text>
        <Text style={[styles.weekdayText, isSelected && styles.dayTextSelected]}>
            {day.format('ddd')}
        </Text>
    </TouchableOpacity>
);

export default DayCard;

const styles = StyleSheet.create({
    card: {
        width: width * 0.18,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardSelected: {
        backgroundColor: '#4CAF50',
    },
    dayText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    weekdayText: {
        fontSize: 14,
        color: '#888',
    },
    dayTextSelected: {
        color: '#fff',
    },
});