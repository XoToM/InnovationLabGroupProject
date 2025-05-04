
import { Link, useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';


export default function ScreensMenu() {
  let router = useRouter();
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Screens Menu</Text>
			<Button title="Login" onPress={()=>router.push("/screens/login")}/>
			<Button title="Signup" onPress={()=>router.push("/screens/signup")}/>
			<Button title="Map" onPress={()=>router.push("/screens/map")}/>
			<Button title="Place" onPress={()=>router.push("/screens/place")}/>
			<Button title="Settings" onPress={()=>router.push("/screens/settings")}/>
			<Button title="Filter" onPress={()=>router.push("/screens/filter-places")}/>
			<Button title="Places" onPress={()=>router.push("/screens/places")}/>
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