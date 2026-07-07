import { useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { colorStyle } from '../styles/Colors';

const { width } = Dimensions.get('window');

const DayCard = ({ day, isSelected, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPress={() => onPress(day)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
        >
            <Animated.View
                style={[styles.card, isSelected && styles.cardSelected, { transform: [{ scale: scaleAnim }] }]}
            >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {day.format('DD')}
                </Text>
                <Text style={[styles.weekdayText, isSelected && styles.dayTextSelected]}>
                    {day.format('ddd')}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default DayCard;

const styles = StyleSheet.create({
    card: {
        width: width * 0.18,
        height: 80,
        borderRadius: 16,
        backgroundColor: colorStyle.bgDark,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorStyle.bgCard,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    cardSelected: {
        backgroundColor: colorStyle.mainGradient[0],
    },
    dayText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colorStyle.textPrimary,
    },
    weekdayText: {
        fontSize: 14,
        color: colorStyle.textMuted,
    },
    dayTextSelected: {
        color: colorStyle.textPrimary,
    },
});