
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';


export default function ScreensMenu() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Screens Menu</Text>
			<Link href="/screens/login">
				<Button title="Login" />
			</Link>
			<Link href="/screens/signup">
				<Button title="Signup" />
			</Link>
			<Link href="/screens/map">
				<Button title="Map" />
			</Link>
			<Link href="/screens/place">
				<Button title="Place" />
			</Link>
			<Link href="/screens/settings">
				<Button title="Settings" />
			</Link>
			<Link href="/screens/filter">
				<Button title="Filter" />
			</Link>
			<Link href="/screens/places">
				<Button title="Places" />
			</Link>
		</View>
	);
}