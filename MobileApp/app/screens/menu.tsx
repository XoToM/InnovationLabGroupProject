
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5a3',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    zIndex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, // Added horizontal padding
    gap: 24, // Increased gap between buttons
  },
  link: {
    width: '80%', // Buttons will take up 80% of container width
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#284e1a',
    paddingVertical: 20, // Increased vertical padding
    paddingHorizontal: 24,
    borderRadius: 12, // Slightly larger border radius
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Buttons will fill their container
  },
  buttonText: {
    color: 'white',
    fontSize: 30, // Larger font size
    fontWeight: 'bold',
  },
});