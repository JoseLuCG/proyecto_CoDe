import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { User } from '../contexts/UserContext';
import ExercisesScreen from '../screens/ExercisesScreen';
import FeedingScreen from '../screens/FeedingScreen';
import OptionsScreen from '../screens/OptionsScreen';
import NavigationBar from '../components/NavigationBar';
import { runnigInBrowser } from '../utilities/defineConfig';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            tabBar={props => <NavigationBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarPosition: runnigInBrowser ? 'top' : 'bottom',
            }}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Exercises" component={ExercisesScreen} />
            <Tab.Screen name="Feeding" component={FeedingScreen} />
            <Tab.Screen name="Options" component={OptionsScreen} />
        </Tab.Navigator>
    );
}

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
					name="MainTabs"
					component={MainTabs}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
