import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colorStyle } from '../styles/Colors';

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
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    cardSelected: {
        backgroundColor: colorStyle.mainGradient[0],
    },
    dayTextSelected: {
        color: colorStyle.textPrimary,
    },
    dayText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
    },
    weekdayText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 2,
    },

});
