import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, Animated, Pressable } from "react-native";
import { textStyle } from '../styles/TextStyles';
import { defaultBRadius } from '../styles/DefaultVaules';
import { LinearGradient } from 'expo-linear-gradient';

function TrainingTab({ data, onPress }) {
    const fuerzaIcon = require("./../../assets/icons/fuerzaIcon.png");
    const weightIcon = require("./../../assets/icons/weightIcon.png");
    const repeatIcon = require("./../../assets/icons/repeatIcon.png");

    const cardioIcon = require("./../../assets/icons/cardioIcon.png");
    const distanceIcon = require("./../../assets/icons/distance.png");
    const intensityIcon = require("./../../assets/icons/intensity.png");
    const timeIcon = require("./../../assets/icons/clock.png");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (data) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [data]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    if (!data) {
        return (
            <View style={[styles.trainingTab, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.loadingText}>Cargando ejercicio...</Text>
            </View>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.trainingTab, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={['rgba(50,205,50,0.3)', 'rgba(0,128,0,0.3)']}
                    style={styles.imageContainer}
                >
                    <Image
                        source={data.distance ? cardioIcon : fuerzaIcon}
                        style={styles.image}
                    />
                </LinearGradient>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={textStyle.exerciseName}>{data.name}</Text>
                    </View>
                    <View style={styles.exerciseDataContainer}>
                        {
                            data.time ?
                                <View style={styles.cardioTimeContainer}>
                                    <Image source={timeIcon} style={styles.styleIcon} />
                                    <Text style={textStyle.dataField}>{data.time}</Text>
                                </View>
                                :
                                <View style={styles.firstContainer}>
                                    <Image source={weightIcon} style={styles.styleIcon} />
                                    <Text style={textStyle.dataField}>{data.weight + "Kg"}</Text>
                                </View>
                        }
                        {
                            data.distance ?
                                <View style={styles.cardioDistanceContainer}>
                                    <Image source={distanceIcon} style={styles.styleIcon} />
                                    <Text style={textStyle.dataField}>{data.distance} Km</Text>
                                </View>
                                :
                                <View style={styles.secondContainer}>
                                    <Text style={textStyle.dataField}>Sets: {data.numberOfSets}</Text>
                                </View>
                        }
                        {
                            data.intensity ?
                                <View style={styles.cardioIntensityContainer}>
                                    <Image source={intensityIcon} style={styles.styleIcon} />
                                    <Text>{data.intensity}</Text>
                                </View>
                                :
                                <View style={styles.thirdContainer}>
                                    <Image source={repeatIcon} style={styles.styleIcon} />
                                    <Text>{data.numberOfReps}</Text>
                                </View>
                        }
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
};
export default TrainingTab;

const styles = StyleSheet.create({
    trainingTab: {
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        height: 80,
        width: 330,
        borderRadius: defaultBRadius,
        padding: 0,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: 'rgba(50, 205, 50, 0.15)',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        height: 40,
        width: 60,
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
        borderTopRightRadius: defaultBRadius,
        borderBottomRightRadius: defaultBRadius,
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
        borderBottomRightRadius: defaultBRadius,
    },
    textContainer: {
        /*backgroundColor: 'rgba(0, 162, 255, 0.3)',*/
        height: '40%',
        paddingBottom: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: defaultBRadius
    },
    cardioTimeContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardioDistanceContainer: {
        backgroundColor: 'rgba(255, 234, 0, 0.46)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardioIntensityContainer: {
        backgroundColor: 'rgba(0, 26, 255, 0.3)',
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        borderBottomRightRadius: defaultBRadius,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    firstContainer: {
        /*backgroundColor: 'rgba(255, 0, 0, 0.3)',*/
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    secondContainer: {
        /* backgroundColor: 'rgba(255, 234, 0, 0.46)',*/
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'center',
    },
    thirdContainer: {
        /*backgroundColor: 'rgba(0, 26, 255, 0.3)',*/
        width: '30%',
        height: '100%',
        flex: 1,
        margin: 0,
        padding: 0,
        borderBottomRightRadius: defaultBRadius,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    styleIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 5
    },
    timeIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginRight: 5
    }
});
