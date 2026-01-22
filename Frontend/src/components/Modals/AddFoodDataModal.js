import { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { User } from "../../contexts/UserContext";

const { height, width } = Dimensions.get('window');

export default function AddFoodDataModal({ date }) {
    // States:
    const [ user ] = useContext(User);
    const [ foodRecordedData, setFoodRecordedData ] = useState({
        nameOringredients: "",
        kcal: 0,
        proteins: 0.0,
        carbohydrates: 0.0,
        fat: 0.0,

    });

    // Handlers:
    function handleInputChange(fieldName, value) {
        setFoodRecordedData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));        
    }

    return (
        <View>
            <Text style={styles.modalTitle}>
                Pestaña de alimentación
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: height * 0.85,
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        //fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "main-font"
    },
    modalSubtitle: {
        fontSize: 18,
        color: '#666',
    },
});