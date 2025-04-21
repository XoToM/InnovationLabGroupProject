
import { Link, useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';


export default function ScreensMenu() {
	const router = useRouter();
	//<Link href="/screens/map"></Link>
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Screens Menu</Text>

			<Button title="Login" onPress={() => router.push('/screens/login')}></Button>
			<Button title="Signup" onPress={() => router.push('/screens/signup')}/>
			<Button title="Map" onPress={() => router.push('/screens/map')}/>
			<Button title="Place" onPress={() => router.push('/screens/place')}/>
			<Button title="Settings" onPress={() => router.push('/screens/settings')}/>
			<Button title="Filter" onPress={() => router.push('/screens/filter')}/>
			<Button title="Places" onPress={() => router.push('/screens/places')}/>
		</View>
	);
}