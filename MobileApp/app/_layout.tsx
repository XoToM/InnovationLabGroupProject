import { AuthProvider } from '@/constants/auth-context';
import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
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
				<Stack>
					<Stack.Screen name="map" options={{ title: "Home" }} />
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	);
}

