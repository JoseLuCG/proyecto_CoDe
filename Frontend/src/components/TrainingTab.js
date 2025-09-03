import React from 'react';
import { View, StyleSheet, Text } from "react-native";

function TrainingTab() {

    return (
        <View style={styles.trainingTab}>
            <Text>ESto es la pestaña de entrenamiento</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    trainingTab: {
        backgroundColor: "red"
    },
});
export default TrainingTab;
