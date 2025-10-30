import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { colorStyle } from '../styles/Colors';
import NavigationBar from '../components/NavigationBar';
import { DaysCarousel } from '../components/DaysCarousel';
import { defaultBRadius } from '../styles/DefaultVaules';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const ExercisesScreen = ({ navigation }) => { 
    // States:
    const [ selectedDate, setSelectedDate ] = useState(null);

    useEffect(()=> {
        console.log("The day selected is:",selectedDate); // TODO: delete this line when the apps works.
    }, [selectedDate]);

    function openTabToAddExercise() {
        console.log("open!");
        
    }

    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={colorStyle.mainGradient}
        >
            <DaysCarousel setSelectedDate={setSelectedDate}/>
            <View>
                <Text style={styles.title}>Hello word this is the Exercises page.</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={openTabToAddExercise}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <NavigationBar/>
        </LinearGradient>
    );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        top: 50
    },
    addButton: {
        position: 'absolute',
		bottom: 140,
		right: 20,
		zIndex: 3,
		backgroundColor: '#ddd',
		width: 50,
		height: 50,
		borderRadius: defaultBRadius,
		alignItems: 'center',
		justifyContent: 'center',
    }, buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});