import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { colorStyle } from '../styles/Colors';
import { buttonStyles } from '../styles/ButtonStyles';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const SideLeftMenu = ({ slideAnim }) => {
    function logOut() {
        console.log("Adios");
    }

    return (
        <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Botón 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Botón 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Botón 3</Text>
            </TouchableOpacity>
            {/* Log Out Button */}
            <Pressable onPress={logOut} style={({ pressed }) => [
                buttonStyles.logOutButton,
                pressed && buttonStyles.logOutButtonPressed
            ]}>
                <Text style={textStyle.button}>Cerrar sesión</Text>
            </Pressable>
        </Animated.View>
    );
};


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
            width: 48,
            height: 48,
            borderRadius: 4,
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

    export default SideLeftMenu;