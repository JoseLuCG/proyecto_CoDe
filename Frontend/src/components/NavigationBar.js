import { View, StyleSheet, Text } from "react-native";
import { defaultBRadius } from '../styles/DefaultVaules';
import NavigationTab from "./NavigationTab";

function NavigationBar() {
    return(
        <View style={styles.navigationBar}>
            <NavigationTab/>
        </View>
    );
}

export default NavigationBar;

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        height: 80,
        width: 350,
        borderRadius: defaultBRadius,
        padding: 0,
        marginTop: 10,
		bottom: 40,
		zIndex: 3,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    }, 
});