import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { colorStyle } from '../styles/Colors';
import { buttonStyles } from '../styles/ButtonStyles';
import SideLeftMenu from '../components/SideLeftMenu';

const { width } = Dimensions.get('window');
const menuWidth = 250;

const HomeScreen = ({ navigation }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const slideAnim = useState(new Animated.Value(-menuWidth))[0];

	const toggleMenu = () => {
		Animated.timing(slideAnim, {
			toValue: menuOpen ? -menuWidth : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		Animated.timing(slideAnim, {
			toValue: -menuWidth,
			duration: 300,
			useNativeDriver: false,
		}).start();
		setMenuOpen(false);
	};

	function logOut() {
		console.log("Adios");

	}
	return (
		<LinearGradient
			style={styles.mainContainer}
			colors={colorStyle.mainGradient}
		>
			{/* Botón menú */}
			<TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
				<Text style={styles.menuIcon}>☰</Text>
			</TouchableOpacity>

			{/* Overlay para cerrar menú al tocar fuera */}
			{menuOpen && (
				<TouchableWithoutFeedback onPress={closeMenu}>
					<View style={styles.overlay} />
				</TouchableWithoutFeedback>
			)}

			<SideLeftMenu slideAnim={slideAnim}/>



			{/* Contenido principal */}
			<View style={styles.content}>
				<View style={styles.routinesContainer}>

				</View>
				<Text style={styles.title}>Pantalla Principal</Text>
			</View>
		</LinearGradient>
	);
};

export default HomeScreen;

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