import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import NavigationBar from '../components/NavigationBar';
import { DaysCarousel } from '../components/DaysCarousel';
import { defaultBRadius } from '../styles/DefaultVaules';
import AddDataModal from '../components/Modals/AddDataModal';
import { User } from '../contexts/UserContext';
import * as apiService from "./../services/exerciseService";
import TrainingTab from '../components/TrainingTab';
import ExerciseModalScreen from './ExerciseModalScreen';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const ExercisesScreen = ({ navigation }) => {
    // States:
    const [user] = useContext(User);
    const [selectedDate, setSelectedDate] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [cardioExercises, setCardioExercises] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    function handleOpenModal(exercise) {
        setSelectedExercise(exercise);
        setModalVisible(true);
    }

    function handleCloseModal(){
        setModalVisible(false);
        setSelectedExercise(null);
    }

    function openTabToAddExercise() {
        console.log("open!");
        setAddModalVisible(true);
    }

    function closeTabToAddExercise() {
        console.log("close!");
        setAddModalVisible(false);
    }

    async function getExercises() {
        try {
            if (selectedDate != null) {
                const response = await apiService.getCardioExercisesInDate(selectedDate.format('YYYY-MM-DD'), user.uuidUser);
                setCardioExercises(response);
            }
        } catch (error) {
            // TODO: add conditionals for the diferents use cases if the user don't work
            console.error(error);
        }
    }

    useEffect(() => {
        getExercises();
    }, [selectedDate]);

    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={colorStyle.mainGradient}
        >
            <DaysCarousel setSelectedDate={setSelectedDate} />
            <View style={styles.exercisesContainer}>
                {
                    cardioExercises != null?
                    cardioExercises.map(
                        (exercise) => <TrainingTab key={exercise.uuidExercise} data={exercise} onPress={() => handleOpenModal(exercise)} />
                    )
                    :
                    ""
                }
            </View>


            {/* Button to open the modal */}
            <TouchableOpacity style={styles.addButton} onPress={openTabToAddExercise}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Modal to add exercises: */}
            <AddDataModal
                isVisible={addModalVisible}
                onClose={closeTabToAddExercise}
                date={selectedDate}
                screen={"Exercises"}
            />
            <ExerciseModalScreen
                isVisible={modalVisible}
                onClose={handleCloseModal}
                exercise={selectedExercise}
            />
            <NavigationBar />
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
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    exercisesContainer: {
        width: width * 0.90
    }
});