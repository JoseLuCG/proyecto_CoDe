import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ActivityIndicator, Keyboard, Dimensions } from 'react-native';
import InputField from '../components/InputField';
import * as apiService from "./../services/authService"
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { User } from '../contexts/UserContext';
import { colorStyle } from '../styles/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
	const { user, setUser } = useContext(User);
	const [userToLogIn, setUserToLogIn] = useState({
		userLoginData: "",
		userPassword: ""
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	function handleInputChange(fieldName, value) {
		setUserToLogIn(prevState => ({
			...prevState,
			[fieldName]: value
		}));
		if (errors[fieldName]) {
			setErrors(prev => ({ ...prev, [fieldName]: "" }));
		}
	}

	function validateForm() {
		const newErrors = {};
		if (!userToLogIn.userLoginData.trim()) {
			newErrors.userLoginData = "Email o teléfono requerido";
		}
		if (!userToLogIn.userPassword) {
			newErrors.userPassword = "Contraseña requerida";
		} else if (userToLogIn.userPassword.length < 6) {
			newErrors.userPassword = "Mínimo 6 caracteres";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	async function submitForm() {
		Keyboard.dismiss();
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			const response = await apiService.loginUser(userToLogIn);
			await setUser(response.token, response.user);
		} catch (error) {
			setErrors({ general: error.message || "Error al iniciar sesión. Verifica tus credenciales." });
		} finally {
			setIsLoading(false);
		}
	}

	function handleRegister() {
		navigation.navigate('Register');
	}

	useEffect(() => {
		if (user != null) {
			navigation.navigate('MainTabs');
		}
	}, [user]);

	return (
		<KeyboardAwareScrollView
			bottomOffset={50}
			enableOnAndroid={true}
			contentContainerStyle={styles.content}
		>
			<LinearGradient
				style={styles.container}
				colors={[colorStyle.mainGradient[0], colorStyle.mainGradient[1], colorStyle.mainGradient[0]]}
			>
				<View style={styles.imageContainer}>
					<Image
						source={require("./../../assets/logoconfondo-remove.png")}
						style={styles.logo}
					/>
				</View>

				<View style={styles.inputContainer}>
					{errors.general ? (
						<Text style={styles.errorGeneral}>{errors.general}</Text>
					) : null}

					<InputField
						label="Email o número de Teléfono"
						value={userToLogIn.userLoginData}
						onChangeText={(text) => handleInputChange("userLoginData", text)}
						keyboardType="email-address"
					/>
					{errors.userLoginData ? (
						<Text style={styles.errorText}>{errors.userLoginData}</Text>
					) : null}

					<InputField
						label="Contraseña"
						value={userToLogIn.userPassword}
						onChangeText={(text) => handleInputChange("userPassword", text)}
						secureTextEntry={!showPassword}
					/>
					{errors.userPassword ? (
						<Text style={styles.errorText}>{errors.userPassword}</Text>
					) : null}

					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Text style={styles.showPassword}>
							{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
						</Text>
					</TouchableOpacity>

					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed && styles.buttonPressed,
							isLoading && styles.buttonDisabled
						]}
						onPress={submitForm}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" size="small" />
						) : (
							<Text style={styles.buttonText}>Iniciar sesión</Text>
						)}
					</Pressable>

					<TouchableOpacity onPress={handleRegister}>
						<Text style={textStyle.text}>
							No tienes cuenta, <Text style={styles.link}>regístrate</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	content: {
		width: '100%',
		height: height * 1.20
	},
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
	},
	button: {
		backgroundColor: '#00B7FF',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 20,
		minWidth: 180,
		minHeight: 44,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	errorText: {
		color: '#FF3B30',
		fontSize: 13,
		alignSelf: 'flex-start',
		marginLeft: '5%',
		marginTop: -8,
		marginBottom: 4,
	},
	errorGeneral: {
		color: '#FF3B30',
		fontSize: 14,
		backgroundColor: 'rgba(255, 59, 48, 0.1)',
		padding: 12,
		borderRadius: 8,
		width: '90%',
		textAlign: 'center',
		marginBottom: 10,
	},
	showPassword: {
		color: '#007BFF',
		fontSize: 13,
		marginTop: -4,
		marginBottom: 8,
	},
});

export default LoginScreen;
