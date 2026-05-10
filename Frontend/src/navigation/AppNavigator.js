import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import { User } from '../contexts/UserContext';
import ExercisesScreen from '../screens/ExercisesScreen';
import FeedingScreen from '../screens/FeedingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
	const { user, isLoading } = useContext(User);

	if (isLoading) {
		return null;
	}

	const isAuthenticated = user !== null && user !== undefined;

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
			{isAuthenticated && (
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
			)}
			{isAuthenticated && (
				<Stack.Screen
					name="Exercises"
					component={ExercisesScreen}
					options={{ headerShown: false }}
				/>
			)}
			{isAuthenticated && (
				<Stack.Screen
					name="Feeding"
					component={FeedingScreen}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
