import { View, StyleSheet, Text } from "react-native";
import { colorStyle } from '../styles/Colors';

export default function FoodTab({ data }) {
    return (
        <View style={styles.foodTab}>
            <View style={styles.header}>
                <Text style={styles.foodName}>{data.food_name}</Text>
                <Text style={styles.kcal}>{data.kcal} kcal</Text>
            </View>
            <View style={styles.macros}>
                <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{data.proteins}g</Text>
                    <Text style={styles.macroLabel}>Proteins</Text>
                </View>
                <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{data.fat}g</Text>
                    <Text style={styles.macroLabel}>Fats</Text>
                </View>
                <View style={styles.macroItem}>
                    <Text style={styles.macroValue}>{data.carbohydrates}g</Text>
                    <Text style={styles.macroLabel}>Carbs</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    foodTab: {
        backgroundColor: colorStyle.bgDark,
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorStyle.textPrimary,
    },
    kcal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorStyle.mainGradient[0],
    },
    macros: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    macroItem: {
        alignItems: 'center',
    },
    macroValue: {
        fontSize: 14,
        fontWeight: '600',
        color: colorStyle.textSecondary,
    },
    macroLabel: {
        fontSize: 11,
        color: colorStyle.textInactive,
        marginTop: 2,
    },
});
