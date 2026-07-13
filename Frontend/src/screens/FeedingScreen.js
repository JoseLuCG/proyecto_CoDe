import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../styles/Colors';
import { DaysCarousel } from '../components/DaysCarousel';
import AddDataModal from '../components/Modals/AddDataModal';
import { User } from '../contexts/UserContext';
import { getFoodsInDate } from '../services/FoodService';
import FoodTab from '../components/FoodTab';
import AddButton from '../components/AddButton';

const { width } = Dimensions.get('window');

const FeedingScreen = ({ navigation }) => {
    const { user, token, isGuest } = useContext(User);
    const [selectedDate, setSelectedDate] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [foods, setFoods] = useState(null);

    async function getFoods() {
        try {
            if (selectedDate != null) {
                const response = await getFoodsInDate(selectedDate.format('YYYY-MM-DD'), user.uuidUser, token, isGuest);
                setFoods(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFoods();
    }, [selectedDate]);

    function openTabToAddExercise() {
        setAddModalVisible(true);
    }

    function closeTabToAddExercise() {
        setAddModalVisible(false);
        getFoods();
    }

    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={colorStyle.mainGradient}
        >
            <DaysCarousel setSelectedDate={setSelectedDate} />
            <View style={styles.foodsContainer}>
                {
                    foods != null ?
                        foods.map(
                            (food, index) => <FoodTab key={food.uuid_food_intake || index} data={food} />
                        )
                        :
                        null
                }
            </View>

            <AddButton onOpen={openTabToAddExercise} />

            <AddDataModal
                isVisible={addModalVisible}
                onClose={closeTabToAddExercise}
                date={selectedDate}
                screen={"Feeding"}
            />
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
        paddingBottom: 155,
    },
    foodsContainer: {
        width: width * 0.90,
    },
});