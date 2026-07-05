import React, { useState, useContext } from 'react';
import { Text, Button, Pressable, ActivityIndicator, View, Keyboard } from 'react-native';
import InputField from '../../components/InputField';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { colorStyle } from '../../styles/Colors';
import { textStyle } from '../../styles/TextStyles';
import { styles } from './RegisterScreen.styles';
import * as apiService from '../../services/AddUserService'
import { User } from '../../contexts/UserContext';

const RegisterScreen = ({ navigation }) => {
    const { user, setUser } = useContext(User);
    const [newUser, setNewUser] = useState({
        userName: "",
        userLastName: "",
        userEmail: "",
        userPhone: "",
        userPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function handleInputChange(fieldName, value) {
        setNewUser(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: "" }));
        }
    }

    function validateForm() {
        const newErrors = {};
        if (!newUser.userName.trim()) newErrors.userName = "Nombre requerido";
        if (!newUser.userLastName.trim()) newErrors.userLastName = "Apellidos requeridos";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newUser.userEmail.trim()) {
            newErrors.userEmail = "Email requerido";
        } else if (!emailRegex.test(newUser.userEmail)) {
            newErrors.userEmail = "Formato de email inválido";
        }

        const phoneRegex = /^\d{9}$/;
        if (!newUser.userPhone.trim()) {
            newErrors.userPhone = "Teléfono requerido";
        } else if (!phoneRegex.test(newUser.userPhone)) {
            newErrors.userPhone = "Deben ser 9 dígitos";
        }

        if (!newUser.userPassword) {
            newErrors.userPassword = "Contraseña requerida";
        } else if (newUser.userPassword.length < 6) {
            newErrors.userPassword = "Mínimo 6 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function backToLogin() {
        navigation.navigate('Login');
    }

    async function submitForm() {
        Keyboard.dismiss();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await apiService.addUser(newUser);
            navigation.navigate('Login');
        } catch (error) {
            setErrors({ general: error.message || "Error al registrar. Intenta de nuevo." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView
            bottomOffset={50}
            enableOnAndroid={true}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <LinearGradient
                colors={colorStyle.mainGradient}
                style={styles.container}
            >
                <View style={styles.card}>
                    <Text style={textStyle.title}>¡Únete a nosotros!</Text>

                    {errors.general ? (
                        <Text style={styles.errorGeneral}>{errors.general}</Text>
                    ) : null}

                    <InputField
                        label="Nombre"
                        value={newUser.userName}
                        onChangeText={(text) => handleInputChange("userName", text)}
                    />
                    {errors.userName ? <Text style={styles.errorText}>{errors.userName}</Text> : null}

                    <InputField
                        label="Apellidos"
                        value={newUser.userLastName}
                        onChangeText={(text) => handleInputChange("userLastName", text)}
                    />
                    {errors.userLastName ? <Text style={styles.errorText}>{errors.userLastName}</Text> : null}

                    <InputField
                        label="Correo Electrónico"
                        value={newUser.userEmail}
                        onChangeText={(text) => handleInputChange("userEmail", text)}
                        keyboardType="email-address"
                    />
                    {errors.userEmail ? <Text style={styles.errorText}>{errors.userEmail}</Text> : null}

                    <InputField
                        label="Número de teléfono"
                        value={newUser.userPhone}
                        onChangeText={(text) => handleInputChange("userPhone", text)}
                        keyboardType="phone-pad"
                    />
                    {errors.userPhone ? <Text style={styles.errorText}>{errors.userPhone}</Text> : null}

                    <InputField
                        label="Contraseña"
                        value={newUser.userPassword}
                        onChangeText={(text) => handleInputChange("userPassword", text)}
                        secureTextEntry
                    />
                    {errors.userPassword ? <Text style={styles.errorText}>{errors.userPassword}</Text> : null}

                    <Pressable
                        onPress={submitForm}
                        disabled={isLoading}
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed,
                            isLoading && styles.buttonDisabled
                        ]}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={textStyle.button}>Registrarse</Text>
                        )}
                    </Pressable>

                    <Button title="Inicia sesión" onPress={backToLogin} />
                </View>
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
};

export default RegisterScreen;
