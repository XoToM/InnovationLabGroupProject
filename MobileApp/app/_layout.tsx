import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider } from "../context/ThemeContext";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider } from '@/constants/auth-context';

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
					<Stack.Screen name="index" options={{ title: "Home" }} />
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	);
}

