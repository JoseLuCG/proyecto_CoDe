import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import NavigationBar from '../components/NavigationBar';
import { DaysCarousel } from '../components/DaysCarousel';
import AddDataModal from '../components/Modals/AddDataModal';
import { defaultBRadius } from '../styles/DefaultVaules';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const FeedingScreen = ({ navigation }) => {
    // States:
    const [selectedDate, setSelectedDate] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);

    // Handlers:

    useEffect(() => {
        console.log("The day selected is:", selectedDate); // TODO: delete this line when the apps works.
    }, [selectedDate]);

    function openTabToAddExercise() {
        console.log("open!");
        setAddModalVisible(true);
    }

    function closeTabToAddExercise() {
        console.log("close!");
        setAddModalVisible(false);
    }

    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={colorStyle.mainGradient}
        >
            <DaysCarousel setSelectedDate={setSelectedDate}/>
            <View>
                <Text style={styles.title}>Hello word this is the Feeding page.</Text>
            </View>
            {/* Button */}
            <TouchableOpacity style={styles.addButton} onPress={openTabToAddExercise}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Modal */}
            <AddDataModal
                isVisible={addModalVisible}
                onClose={closeTabToAddExercise}
                date={selectedDate}
                screen={"Feeding"}
            />
            <NavigationBar />
        </LinearGradient>
    );
};

export default FeedingScreen;

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