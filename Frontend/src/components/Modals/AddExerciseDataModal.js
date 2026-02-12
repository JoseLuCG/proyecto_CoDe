import { useContext } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Text, View } from "react-native";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import WorkoutSwitch from "../WorkoutSwitch";
import * as apiService from "./../../services/exerciseService";
import { User } from '../../contexts/UserContext';
import SavedSetInfoDisplay from "./SavedSetInfoDisplay";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { textStyle } from "../../styles/TextStyles";
import AddCardioForm from "./addCardioForm";

const { width } = Dimensions.get('window');

export default function AddExerciseDataModal({ date }) {
    // States:
    const [user] = useContext(User);
    const [selectedType, setSelectedType] = useState("");

    // Handlers:
    function handleTypeChange(value) {
        setSelectedType(value);
    }
    /*
    useEffect(
        () => {
            
        }, [selectedType]
    );
    */
    if (selectedType == "CARDIO") {
        return(
            <AddCardioForm date={date}/>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={textStyle.text}>Select the type of exercise to record:</Text>
                <TouchableOpacity style={styles.eitherButton} onPress={() => handleTypeChange("CARDIO")}>
                    <Text style={styles.buttonText}>CARDIO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eitherButton} onPress={() => handleTypeChange("SRENGTH")}>
                    <Text style={styles.buttonText}>STRENGTH</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //width: width * 0.95,
    },
    textHeader: {

    },
    textContainer: {
        marginTop: 20,
        display: "flex",
        alignItems: 'center',
    },
    eitherButton: {
        backgroundColor: '#1563ac88',
        width: 190,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});

/*
    return (
        <KeyboardAwareScrollView
            bottomOffset={50}
            enableOnAndroid={true}
            contentContainerStyle={styles.content}
        >
            <View style={styles.container}>
                <InputField
                    label="Exercise name:"
                    value={exerciseData.exerciseName}
                    onChangeText={(text) => handleInputChange("exerciseName", text)}
                    keyboardType="text-pad"
                />

                <WorkoutSwitch
                    exerciseType={exerciseData.exerciseType}
                    setExerciseType={(value) => handleInputChange('exerciseType', value)}
                />

                {
                    exerciseData.exerciseType ?
                        // Strenght Input
                        <InputField
                            label="Weight:"
                            value={exerciseData.exerciseWeight}
                            onChangeText={(text) => handleInputChange("exerciseWeight", text)}
                            keyboardType="phone-pad"
                        />
                        :
                        // Cardio Input
                        <InputField
                            label="Time:"
                            value={exerciseData.exerciseTime}
                            onChangeText={(text) => handleInputChange("exerciseTime", text)}
                            keyboardType="text-pad"
                        />
                }

                {
                    exerciseData.exerciseType ?
                        <InputField
                            label="Repeats:"
                            value={exerciseData.exerciseRepeats}
                            onChangeText={(text) => handleInputChange("exerciseRepeats", text)}
                            keyboardType="phone-pad"
                        />
                        :
                        <InputField
                            label="Distance:"
                            value={exerciseData.exerciseDistance}
                            onChangeText={(text) => handleInputChange("exerciseDistance", text)}
                            keyboardType="phone-pad"
                        />
                }

                {
                    exerciseData.exerciseType ?
                        null
                        :
                        <InputField
                            label="Intensity:"
                            value={exerciseData.exerciseIntensity}
                            onChangeText={(text) => handleInputChange("exerciseIntensity", text)}
                            keyboardType="phone-pad"
                        />
                }
                {
                    exerciseData.exerciseType ? <SavedSetInfoDisplay /> : null
                }
                <TouchableOpacity style={styles.addButton} onPress={submitForm}>
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>

    );
*/