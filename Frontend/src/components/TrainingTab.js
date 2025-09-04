import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, Animated } from "react-native";
import { textStyle } from '../styles/TextStyles';

function TrainingTab({ data }) {
    const fuerzaIcon = require("./../../assets/icons/fuerzaIcon.png");
    const cardioIcon = require("./../../assets/icons/cardioIcon.png");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (data) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [data]);

    if (!data) {
        return (
            <View style={[styles.trainingTab, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.loadingText}>Cargando ejercicio...</Text>
            </View>
        );
    }



    return (
        <Animated.View style={[styles.trainingTab, { opacity: fadeAnim }]}>
            <View style={styles.imageContainer}>
                <Image
                    source={fuerzaIcon}
                    style={styles.image}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={textStyle.exerciseName}>{data.exerciseName}</Text>
                </View>
                <View style={styles.exerciseDataContainer}>
                    <View style={styles.firstContainer}>
                        <Text>{data.weight}</Text>
                    </View>
                    <View style={styles.secondContainer}>
                        <Text>{data.numberOfSets}</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <Text>{data.numberOfReps}</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    trainingTab: {
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        height: 80,
        width: 300,
        borderRadius: 14,
        padding: 0,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: 'rgba(64, 255, 0, 0.43)',
        height: 80,
        width: 60,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 50,
        width: 30,
        resizeMode: 'contain',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
    contentContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
        height: '100%',
        width: 240,
        margin: 0,
        padding: 0
    },
        exerciseDataContainer: {
        flexDirection: 'row',
        height: '70%',
        width: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        borderBottomRightRadius: 14,
    },
    textContainer: {
        height: '40%',
        paddingTop: 5,
        paddingBottom: 5,
        alignContent: 'center',
        alignItems: 'center'
    },
    firstContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0
    },
    secondContainer: {
        backgroundColor: 'rgba(255, 234, 0, 0.46)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0
    },
    thirdContainer: {
        backgroundColor: 'rgba(0, 26, 255, 0.3)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        borderBottomRightRadius: 14,
    },
});
export default TrainingTab;
