import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    ScrollView,
    Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import { DaysCarousel } from '../components/DaysCarousel';
import { defaultBRadius } from '../styles/DefaultVaules';
import AddDataModal from '../components/Modals/AddDataModal';
import { User } from '../contexts/UserContext';
import * as apiService from "./../services/exerciseService";
import * as cathegoryService from "./../services/cathegoryService";
import TrainingTab from '../components/TrainingTab';
import ExerciseModalScreen from './ExerciseModalScreen';
import AddButton from '../components/AddButton';

const { width } = Dimensions.get('window');

const ExercisesScreen = ({ navigation }) => {
    // States:
    const { user, token } = useContext(User);
    const [selectedDate, setSelectedDate] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [cardioExercises, setCardioExercises] = useState(null);
    const [strenghtExercises, setStrenghtExercises] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [cathegories, setCathegories] = useState([]);
    const [cathegoryModalVisible, setCathegoryModalVisible] = useState(false);

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

    async function openCathegories() {
        try {
            const data = await cathegoryService.getCathegories(token);
            setCathegories(data);
            setCathegoryModalVisible(true);
        } catch (error) {
            console.error(error);
        }
    }

    function groupByCathegory(exercises) {
        const grouped = {};
        exercises.forEach(ex => {
            const key = ex.cathegoryName || "Uncategorized";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ex);
        });
        return grouped;
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
                    {/* Cathegories button */}
                    <TouchableOpacity style={styles.cathegoryButton} onPress={openCathegories} activeOpacity={0.8}>
                        <Text style={styles.cathegoryButtonText}>Categories</Text>
                    </TouchableOpacity>

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
                            Object.entries(groupByCathegory(strenghtExercises)).map(([cathegory, exercises]) => (
                                <View key={cathegory} style={styles.cathegoryGroup}>
                                    <Text style={styles.cathegoryGroupTitle}>{cathegory}</Text>
                                    {exercises.map(exercise => (
                                        <TrainingTab key={exercise.uuidExercise} data={exercise} onPress={() => handleOpenModal(exercise)} />
                                    ))}
                                </View>
                            ))
                            :
                            ""
                    }
                </View>
            </View>

            {/* Button to open the add modal */}
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

            {/* Modal to display cathegories: */}
            <Modal
                visible={cathegoryModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setCathegoryModalVisible(false)}
            >
                <View style={styles.cathegoryModalOverlay}>
                    <View style={styles.cathegoryModalContent}>
                        <Text style={styles.cathegoryModalTitle}>Exercise Categories</Text>
                        <ScrollView style={styles.cathegoryList}>
                            {cathegories.length > 0 ? (
                                cathegories.map((cat) => (
                                    <View key={cat.uuid_cathegory} style={styles.cathegoryItem}>
                                        <Text style={styles.cathegoryItemText}>{cat.cathegory_name}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.noCathegoriesText}>No categories available</Text>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeCathegoryButton}
                            onPress={() => setCathegoryModalVisible(false)}
                        >
                            <Text style={styles.closeCathegoryButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    cathegoryButton: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    cathegoryButtonText: {
        color: colorStyle.textPrimary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    cathegoryModalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    cathegoryModalContent: {
        width: '80%',
        maxHeight: '70%',
        backgroundColor: colorStyle.bgDark,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    cathegoryModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colorStyle.textPrimary,
        marginBottom: 15,
    },
    cathegoryList: {
        width: '100%',
    },
    cathegoryItem: {
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    cathegoryItemText: {
        color: colorStyle.textPrimary,
        fontSize: 16,
    },
    noCathegoriesText: {
        color: colorStyle.textInactive,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
    closeCathegoryButton: {
        marginTop: 15,
        backgroundColor: colorStyle.mainGradient[1],
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    closeCathegoryButtonText: {
        color: colorStyle.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cathegoryGroup: {
        width: '100%',
        marginTop: 8,
    },
    cathegoryGroupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorStyle.textSecondary,
        marginLeft: 8,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});