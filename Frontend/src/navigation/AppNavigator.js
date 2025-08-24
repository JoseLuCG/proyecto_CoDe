import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
// import HomeScreen from '../screens/HomeScreen'; // más adelante

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;