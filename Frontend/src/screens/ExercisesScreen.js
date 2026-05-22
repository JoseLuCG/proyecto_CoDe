import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import { DaysCarousel } from '../components/DaysCarousel';
import { defaultBRadius } from '../styles/DefaultVaules';
import AddDataModal from '../components/Modals/AddDataModal';
import { User } from '../contexts/UserContext';
import * as apiService from "./../services/exerciseService";
import TrainingTab from '../components/TrainingTab';
import ExerciseModalScreen from './ExerciseModalScreen';
import AddButton from '../components/AddButton';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const ExercisesScreen = ({ navigation }) => {
    // States:
    const { user, token } = useContext(User);
    const [selectedDate, setSelectedDate] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [cardioExercises, setCardioExercises] = useState(null);
    const [strenghtExercises, setStrenghtExercises] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    function handleOpenModal(exercise) {
        setSelectedExercise(exercise);
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
        setSelectedExercise(null);
    }

    function openTabToAddExercise() {
        console.log("open!");
        setAddModalVisible(true);
    }

    function closeTabToAddExercise() {
        setAddModalVisible(false);
        getExercises();
    }

    async function getExercises() {
        try {
            if (selectedDate != null) {
                const response = await apiService.getCardioExercisesInDate(selectedDate.format('YYYY-MM-DD'), user.uuidUser, token);
                const responseStrenghtExercises = await apiService.getStrengthExercisesInDate(selectedDate.format('YYYY-MM-DD'), user.uuidUser, token);
                setCardioExercises(response);
                setStrenghtExercises(responseStrenghtExercises);
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
            <View style={Platform.OS === 'web' ? styles.webRow : styles.mobileColumn}>
                <View style={Platform.OS === 'web' ? styles.calendarColumn : null}>
                    <DaysCarousel setSelectedDate={setSelectedDate} />
                </View>
                <View style={Platform.OS === 'web' ? styles.exercisesColumn : styles.exercisesContainer}>
                    {
                        cardioExercises != null ?
                            cardioExercises.map(
                                (exercise) => <TrainingTab key={exercise.uuidExercise} data={exercise} onPress={() => handleOpenModal(exercise)} />
                            )
                            :
                            ""
                    }
                    {
                        strenghtExercises != null ?
                            strenghtExercises.map(
                                (exercise) => <TrainingTab key={exercise.uuidExercise} data={exercise} onPress={() => handleOpenModal(exercise)} />
                            )
                            :
                            ""
                    }
                </View>
            </View>

            {/* Button to open the modal */}
            <AddButton onOpen={openTabToAddExercise} />

            {/* Modal to add exercises: */}
            <AddDataModal
                isVisible={addModalVisible}
                onClose={closeTabToAddExercise}
                date={selectedDate}
                screen={"Exercises"}
            />

            {/* Modal to view exercise details: */}
            <ExerciseModalScreen
                isVisible={modalVisible}
                onClose={handleCloseModal}
                exercise={selectedExercise}
            />
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
        paddingBottom: 155,
    },
    webRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        maxWidth: 1200,
        gap: 24,
    },
    mobileColumn: {
        width: '100%',
        alignItems: 'center',
    },
    calendarColumn: {
        flex: 0.4,
        maxWidth: 420,
    },
    exercisesColumn: {
        flex: 0.6,
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