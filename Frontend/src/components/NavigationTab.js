import { View, StyleSheet, Text } from "react-native";
import { defaultBRadius } from '../styles/DefaultVaules';

function NavigationTab() {
    return(
        <View style={styles.navigationTab}>
            <Text>Home</Text>
        </View>
    );
}

export default NavigationTab;

const styles = StyleSheet.create({
    navigationTab: {
        backgroundColor: 'rgba(0, 200, 255, 0.91)',
        height: 70,
        width: 80,
        borderRadius: defaultBRadius,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
});