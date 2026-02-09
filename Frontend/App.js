import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { UserProvider } from './src/contexts/UserContext';
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const loadFonts = async () => {
		await Font.loadAsync({
			"main-font": require("./assets/fonts/attort.ttf")
		});
		setFontsLoaded(true);
	};

	useEffect(() => {
		loadFonts();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<KeyboardProvider>
			<UserProvider>
				<NavigationContainer onReady={onLayoutRootView}>
					<AppNavigator />
				</NavigationContainer>
			</UserProvider>
		</KeyboardProvider>
	);
};

export default App;