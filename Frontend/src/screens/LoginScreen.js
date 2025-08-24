import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import { loginUser } from '../services/authService';
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient de expo
import { textStyle } from '../styles/TextStyles';

const LoginScreen = ({ navigation }) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		if (!phoneNumber || !password) {
			Alert.alert('Error', 'Por favor, ingrese todos los campos');
			return;
		}

		try {
			const response = await loginUser(phoneNumber, password);
			if (response.success) {
				Alert.alert('Éxito', 'Login exitoso');
			} else {
				Alert.alert('Error', 'Número de teléfono o contraseña incorrectos');
			}
		} catch (error) {
			Alert.alert('Error', 'Hubo un problema al autenticarte');
		}
	};

	const handleRegister = () => {
		navigation.navigate('Register');
	};

	return (
		<LinearGradient 
			style={styles.container}
			colors={['#6A266F','#00B7FF','#6A266F']}
		>
			<View style={styles.imageContainer}>
				<Image 
					source={require("./../../assets/logoconfondo-remove.png")}
					style={styles.logo}
				/>
			</View>

			<View
				colors={['#00FF6A', '#00B7FF']} // Colores del gradiente
				style={styles.inputContainer}   // Aplica el gradiente al contenedor
			>
				<InputField
					label="Número de Teléfono"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType="phone-pad"
				/>

				<InputField
					label="Contraseña"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>

				<Button title="Iniciar sesión" onPress={handleLogin} />

				<TouchableOpacity onPress={handleRegister}>
					<Text style={textStyle.text}>
						No tienes cuenta, <Text style={styles.link}>regístrate</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		padding: 20,
		width: '100%'
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	link: {
		color: '#007BFF',
		textDecorationLine: 'underline',
		marginTop: 40,
	},
	logo: {
		width: 450, // Ajusta el tamaño del logo
		height: 450, // Ajusta el tamaño del logo
		resizeMode: 'contain', // No distorsionar la imagen
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 200,
	}
});

export default LoginScreen;