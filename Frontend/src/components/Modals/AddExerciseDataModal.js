import { View, Text, StyleSheet } from "react-native";
import InputField from "../InputField";
import { useState } from "react";

export default function AddExerciseDataModal() {
    // States:
    const [ exerciseData, setExerciseData ] = useState({
        exerciseName: "",
        exerciseType: 1,
        exerciseDate: "",
        exerciseIntensity: "",
        exerciseTime: "",
        exerciseDistance: "",
        exerciseSetNumber: "",
        exerciseWeight: "",
        exerciseRepeats: ""
    });

    return(
        <View>
    		<InputField
				label="Exercise name:"
				value={userToLogIn.userLoginData}
				onChangeText={(text) => handleinputChange("exerciseName", text)}
				keyboardType="phone-pad"
			/>
            
        </View>
    );
}

const styles = StyleSheet.create({

});