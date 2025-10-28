import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { colorStyle } from '../styles/Colors';
import { buttonStyles } from '../styles/ButtonStyles';
import SideLeftMenu from '../components/SideLeftMenu';
import TrainingTab from '../components/TrainingTab';
import { exampleData } from '../services/dataProves';
import ExerciseModalScreen from './ExerciseModalScreen';
import NavigationBar from '../components/NavigationBar';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const ExercisesScreen = ({ navigation }) => { 
    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={colorStyle.mainGradient}
        >
            <View>
                <Text style={styles.title}>Hello word this is the Exercises page.</Text>
            </View>
            <NavigationBar/>
        </LinearGradient>
    );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 3,
        backgroundColor: '#ddd',
        width: 50,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        fontSize: 24,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: menuWidth,
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingHorizontal: 20,
        zIndex: 2,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        fontSize: 18,
        fontFamily: "main-font"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    routinesContainer: {
        backgroundColor: 'rgba(201, 237, 255, 0.76)',
        height: 200,
        width: 300,
        borderRadius: 14,
    }
});