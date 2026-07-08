import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp, useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
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
    const [cathegoryDropdownVisible, setCathegoryDropdownVisible] = useState(false);
    const animProgress = useSharedValue(0);

    useEffect(() => {
        animProgress.value = withTiming(cathegoryDropdownVisible ? 1 : 0, { duration: 250 });
    }, [cathegoryDropdownVisible]);

    const animatedButtonStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animProgress.value,
            [0, 1],
            [colorStyle.mainGradient[0], colorStyle.bgDark]
        ),
        borderBottomLeftRadius: animProgress.value === 1 ? 0 : 20,
        borderBottomRightRadius: animProgress.value === 1 ? 0 : 20,
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animProgress.value,
            [0, 1],
            [colorStyle.textPrimary, colorStyle.mainGradient[0]]
        ),
    }));

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

    async function toggleCathegories() {
        if (cathegoryDropdownVisible) {
            setCathegoryDropdownVisible(false);
            return;
        }
        try {
            const data = await cathegoryService.getCathegories(token);
            setCathegories(data);
            setCathegoryDropdownVisible(true);
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
                    {/* Cathegories dropdown */}
                    <View style={styles.cathegoryDropdownWrapper}>
                        <Animated.View style={[styles.cathegoryButton, animatedButtonStyle]}>
                            <TouchableOpacity
                                onPress={toggleCathegories}
                                activeOpacity={0.8}
                            >
                                <Animated.Text style={[styles.cathegoryButtonText, animatedTextStyle]}>Categories</Animated.Text>
                            </TouchableOpacity>
                        </Animated.View>
                        {cathegoryDropdownVisible && (
                            <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutUp.duration(150)} style={styles.cathegoryDropdown}>
                                {cathegories.length > 0 ? (
                                    cathegories.map((cat) => (
                                        <TouchableOpacity
                                            key={cat.uuid_cathegory}
                                            style={styles.cathegoryDropdownItem}
                                            onPress={() => setCathegoryDropdownVisible(false)}
                                        >
                                            <Text style={styles.cathegoryDropdownItemText}>{cat.cathegory_name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.cathegoryDropdownEmpty}>No categories available</Text>
                                )}
                            </Animated.View>
                        )}
                    </View>

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
    exercisesContainer: {
        width: width * 0.90,
        alignItems: 'center',
    },
    cathegoryButton: {
        backgroundColor: colorStyle.mainGradient[0],
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    cathegoryButtonText: {
        color: colorStyle.textPrimary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    cathegoryDropdownWrapper: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 300,
        marginBottom: 10,
        marginTop: 5,
        zIndex: 10,
    },
    cathegoryDropdown: {
        backgroundColor: colorStyle.bgDark,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 8,
        minWidth: 200,
        maxHeight: 200,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colorStyle.mainGradient[0] + '40',
    },
    cathegoryDropdownItem: {
        backgroundColor: colorStyle.mainGradient[0] + '30',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 4,
    },
    cathegoryDropdownItemText: {
        color: colorStyle.textPrimary,
        fontSize: 14,
    },
    cathegoryDropdownEmpty: {
        color: colorStyle.textInactive,
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 14,
    },
    cathegoryGroup: {
        width: '100%',
        marginTop: 8,
    },
    cathegoryGroupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorStyle.textPrimary,
        marginLeft: 8,
        marginBottom: 4,
    },
});