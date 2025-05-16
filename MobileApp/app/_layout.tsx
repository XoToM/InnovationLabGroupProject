import { HeaderBar } from '@/components/headerbar';
import { AuthProvider } from '@/constants/auth-context';
import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React from 'react';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);
	
	return (
		<ThemeProvider>
			<AuthProvider>
				<Stack screenOptions={{header:HeaderBar}}>
					<Stack.Screen name="index" options={{headerShown:false }} />
					<Stack.Screen name="map" options={{ title: "Home" }} />
					<Stack.Screen name="screens/settings" options={{ title: "Settings" }} />
					<Stack.Screen name="screens/filter-places" options={{ title: "Places" }} />
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	);
}

