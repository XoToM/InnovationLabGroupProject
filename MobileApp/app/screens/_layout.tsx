import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { AuthProvider } from '../../constants/auth-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
	//const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}//<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>/ThemeProvider>

	return (
		<AuthProvider>  {/* Wrap everything inside AuthProvider */}
			<Stack>
				<Stack.Screen name="index" options={{ title: "Home" }} />
				<Stack.Screen name="login" options={{ title: "Login" }} />
				<Stack.Screen name="signup" options={{ title: "Sign Up" }} />
			</Stack>
			<StatusBar style="auto" />
		</AuthProvider>
	);
}

