import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ActivityIndicator, Keyboard, Animated } from 'react-native';
import InputField from '../components/InputField';
import * as apiService from "./../services/authService"
import { LinearGradient } from 'expo-linear-gradient';
import { textStyle } from '../styles/TextStyles';
import { User } from '../contexts/UserContext';
import { colorStyle } from '../styles/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { defaultBRadius } from '../styles/DefaultVaules';

const LoginScreen = ({ navigation }) => {
	const { user, setUser } = useContext(User);
	const [userToLogIn, setUserToLogIn] = useState({
		userLoginData: "",
		userPassword: ""
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const loginScaleAnim = useRef(new Animated.Value(1)).current;
	const registerScaleAnim = useRef(new Animated.Value(1)).current;

	const handleLoginPressIn = () => {
		Animated.spring(loginScaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleLoginPressOut = () => {
		Animated.spring(loginScaleAnim, {
			toValue: 1,
			friction: 3,
			useNativeDriver: true,
		}).start();
	};

	const handleRegisterPressIn = () => {
		Animated.spring(registerScaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleRegisterPressOut = () => {
		Animated.spring(registerScaleAnim, {
			toValue: 1,
			friction: 3,
			useNativeDriver: true,
		}).start();
	};

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
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<LinearGradient
				style={styles.container}
				colors={colorStyle.mainGradient}
			>
				<View style={styles.card}>
					<Image
						source={require("./../../assets/logoconfondo-remove.png")}
						style={styles.logo}
					/>

					<Text style={textStyle.title}>Inicia sesión</Text>

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
						style={[styles.button, isLoading && styles.buttonDisabled]}
						onPress={submitForm}
						disabled={isLoading}
						onPressIn={handleLoginPressIn}
						onPressOut={handleLoginPressOut}
					>
						<Animated.View style={{ transform: [{ scale: loginScaleAnim }] }}>
							{isLoading ? (
								<ActivityIndicator color="#fff" size="small" />
							) : (
								<Text style={styles.buttonText}>Iniciar sesión</Text>
							)}
						</Animated.View>
					</Pressable>

					<Pressable
						onPress={handleRegister}
						onPressIn={handleRegisterPressIn}
						onPressOut={handleRegisterPressOut}
						style={styles.linkButton}
					>
						<Animated.View style={{ transform: [{ scale: registerScaleAnim }] }}>
							<Text style={styles.buttonText}>Regístrate</Text>
						</Animated.View>
					</Pressable>
				</View>
			</LinearGradient>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	card: {
		backgroundColor: colorStyle.bgCard,
		borderRadius: 20,
		padding: 24,
		width: '100%',
		maxWidth: 400,
		alignItems: 'center',
	},
	logo: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
		marginBottom: 8,
	},
	button: {
		backgroundColor: colorStyle.mainGradient[0],
		borderRadius: defaultBRadius,
		padding: 14,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 48,
		marginVertical: 10,
		width: '100%',
		maxWidth: 150,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		fontSize: 16,
		color: colorStyle.textPrimary,
		textAlign: 'center',
	},
	linkButton: {
		padding: 8,
		marginTop: 12,
		alignItems: 'center',
		justifyContent: 'center',
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
		alignSelf: 'center',
	},
	showPassword: {
		color: colorStyle.textSecondary,
		fontSize: 13,
		marginTop: -4,
		marginBottom: 8,
	},
});

export default LoginScreen;
