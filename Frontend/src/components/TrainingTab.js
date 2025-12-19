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
                <View style={styles.imageContainer}>
                    <LinearGradient
                        colors={['rgba(50,205,50,0.3)', 'rgba(0,128,0,0.3)']}
                        style={styles.imageBackground}
                    >
                        <Image
                            source={data.distance ? cardioIcon : fuerzaIcon}
                            style={styles.image}
                        />
                    </LinearGradient>
                </View>
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
                                <View style={styles.strengthWeightContainer}>
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
                                <View style={styles.strengthSetsContainer}>
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
                                <View style={styles.strengthRepeatsContainer}>
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
    // * ----- Loading Styles -----
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
    // * ----- Component Styles -----
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
    // * ----- Image Content -----
    imageContainer: {
        width: "23%",
        height: "100%",
        justifyContent: 'center'
    },
    imageBackground: {
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
    // * ----- Content Styles: -----
    contentContainer: {
        width: "77%",
        height: '100%',
        borderTopRightRadius: defaultBRadius,
        borderBottomRightRadius: defaultBRadius,
        margin: 0,
        padding: 0,
    },
    textContainer: {
        height: '50%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exerciseDataContainer: {
        flexDirection: 'row',
        height: '50%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    // * ----- Cardio Styles: -----
    cardioTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardioDistanceContainer: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardioIntensityContainer: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    // * ----- Strength Styles: -----
    strengthWeightContainer: {
        width: '30%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    strengthSetsContainer: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
    },
    strengthRepeatsContainer: {
        width: '30%',
        height: '100%',
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
