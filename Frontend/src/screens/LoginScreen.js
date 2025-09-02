import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import * as apiService from "./../services/authService"
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { User } from '../contexts/UserContext';

const LoginScreen = ({ navigation }) => {
	// States:
	const [ user, setUser ] = useContext(User);
	const [userToLogIn, setUserToLogIn] = useState({
		userLoginData: "",
		userPassword: ""
	});
	
	// Handlers:
	function handleinputChange(fieldName, value) {
		setUserToLogIn(prevState => ({
			...prevState,
			[fieldName]: value
		}));
	}

	async function submitForm() {
		try {
			const response = await apiService.loginUser(userToLogIn);
			
			setUser(response);
		} catch (error) {
			throw new Error("Something is wrong");
			// TODO: add conditionals for the diferents use cases if the user don't work
			console.error(error);
		}
			
	}

	const handleRegister = () => {
		navigation.navigate('Register');
	};

	useEffect(() => {
		if (user != null) { 
			navigation.navigate('Home');
		} else {
			navigation.navigate('Login');
		}
	}, [user]);	

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
				colors={['#00FF6A', '#00B7FF']} 
				style={styles.inputContainer}
			>
				<InputField
					label="Email o número de Teléfono"
					value={userToLogIn.userLoginData}
					onChangeText={(text) => handleinputChange("userLoginData", text)}
					keyboardType="phone-pad"
				/>

				<InputField
					label="Contraseña"
					value={userToLogIn.userPassword}
					onChangeText={(text) => handleinputChange("userPassword", text)}
					secureTextEntry
				/>

				<Button title="Iniciar sesión" onPress={submitForm} />

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
		width: 450,
		height: 450,
		resizeMode: 'contain',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 200,
	}
});

export default LoginScreen;