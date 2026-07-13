import React, { useContext, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorStyle } from '../../styles/Colors';
import { buttonStyles } from '../../styles/ButtonStyles';
import { styles } from './HomeScreen.styles';
import SideLeftMenu from '../../components/SideLeftMenu';
import TrainingTab from '../../components/TrainingTab';
import { exampleData } from '../../services/dataProves';
import ExerciseModalScreen from '../ExerciseModalScreen';
import { User } from '../../contexts/UserContext';

const menuWidth = 250;

const HomeScreen = ({ navigation }) => {
	const { isGuest } = useContext(User);
	const [menuOpen, setMenuOpen] = useState(false);
	const slideAnim = useState(new Animated.Value(-menuWidth))[0];

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedExercise, setSelectedExercise] = useState(null);

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

	const handleOpenModal = (exercise) => {
		setSelectedExercise(exercise);
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		setSelectedExercise(null);
	};

	return (
		<LinearGradient
			style={styles.mainContainer}
			colors={colorStyle.mainGradient}
		>
			{/* Botón menú */}
			<TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
				<Text style={styles.menuIcon}>☰</Text>
			</TouchableOpacity>

			<SideLeftMenu slideAnim={slideAnim} menuOpen={menuOpen} closeMenu={closeMenu} />

			{isGuest && (
				<View style={styles.guestBanner}>
					<Text style={styles.guestBannerText}>Modo invitado — Los datos se guardan solo en este dispositivo</Text>
				</View>
			)}

			{/* Contenido principal */}
			<View style={styles.content}>
				<View style={styles.routinesContainer}></View>
				<Text style={styles.title}>Pantalla Principal</Text>

				<TrainingTab data={exampleData} onPress={() => handleOpenModal(exampleData)} />
				<TrainingTab />
			</View>

			{/* Modal */}
			<ExerciseModalScreen
				isVisible={modalVisible}
				onClose={handleCloseModal}
				exercise={selectedExercise}
			/>
		</LinearGradient>
	);
};

export default HomeScreen;