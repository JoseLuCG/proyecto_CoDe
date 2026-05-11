import { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import * as apiService from "./../../services/FoodService"
import InputField from "../InputField";
import { User } from "../../contexts/UserContext";
import { colorStyle } from "../../styles/Colors";

const { height } = Dimensions.get('window');

export default function AddFoodDataModal({ date }) {
    const { user, token } = useContext(User);
    const [foodRecordedData, setFoodRecordedData] = useState({
        nameOringredients: "",
        kcal: 0,
        proteins: 0.0,
        carbohydrates: 0.0,
        fat: 0.0,
    });

    function handleInputChange(fieldName, value) {
        setFoodRecordedData(prev => ({ ...prev, [fieldName]: value }));
    }

    async function submitForm() {
        try {
            const response = await apiService.addFood(foodRecordedData, token);
            console.log(foodRecordedData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    label="Food name"
                    value={foodRecordedData.nameOringredients}
                    onChangeText={(text) => handleInputChange("nameOringredients", text)}
                    keyboardType="text-pad"
                    centered={true}
                />

                <InputField
                    label="Kcal"
                    value={foodRecordedData.kcal}
                    onChangeText={(text) => handleInputChange("kcal", text)}
                    keyboardType="number-pad"
                    centered={true}
                />

                <InputField
                    label="Proteins (g)"
                    value={foodRecordedData.proteins}
                    onChangeText={(text) => handleInputChange("proteins", text)}
                    keyboardType="decimal-pad"
                    centered={true}
                />

                <InputField
                    label="Fats (g)"
                    value={foodRecordedData.fat}
                    onChangeText={(text) => handleInputChange("fat", text)}
                    keyboardType="decimal-pad"
                    centered={true}
                />

                <InputField
                    label="Carbohydrates (g)"
                    value={foodRecordedData.carbohydrates}
                    onChangeText={(text) => handleInputChange("carbohydrates", text)}
                    keyboardType="decimal-pad"
                    centered={true}
                />
            </View>

            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colorStyle.mainGradient[0] }]}
                onPress={submitForm}
                activeOpacity={0.8}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: "main-font"
    },
    saveButton: {
        width: '85%',
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});