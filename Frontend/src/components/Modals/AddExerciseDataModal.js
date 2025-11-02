import { StyleSheet, Dimensions, ScrollView } from "react-native";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import WorkoutSwitch from "../WorkoutSwitch";

const { width } = Dimensions.get('window');

export default function AddExerciseDataModal() {
    // States:
    const [ exerciseData, setExerciseData ] = useState({
        exerciseName: "",
        exerciseType: false,
        exerciseDate: "",
        exerciseIntensity: "",
        exerciseTime: "",
        exerciseDistance: "",
        exerciseSetNumber: "",
        exerciseWeight: "",
        exerciseRepeats: ""
    });

    // Handlers:
    function handleInputChange(fieldName, value) {
        setExerciseData(prevState => ({
            ...prevState,
            [fieldName]:value
        }));
    }

    return(
        <ScrollView style={styles.container}>
    		<InputField
				label="Exercise name:"
				value={exerciseData.exerciseName}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>

            <WorkoutSwitch 
                exerciseType={exerciseData.exerciseType} 
                setExerciseType={ (value) => handleInputChange('exerciseType', value)}
            />

            {/* Cardio Exercises */}
            <InputField
				label="Time:"
				value={exerciseData.exerciseTime}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>
            <InputField
				label="Distance:"
				value={exerciseData.exerciseDistance}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>
            <InputField
				label="Intensity:"
				value={exerciseData.exerciseIntensity}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>

            {/* Strength Exercises */}
            <InputField
				label="Weight:"
				value={exerciseData.exerciseWeight}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>
            <InputField
				label="Repeats:"
				value={exerciseData.exerciseRepeats}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>
            <InputField
				label="Add new set"
				value={exerciseData.exerciseSetNumber}
				onChangeText={(text) => handleInputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.80,
    }
});