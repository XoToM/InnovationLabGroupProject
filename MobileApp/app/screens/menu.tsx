
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';


export default function ScreensMenu() {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Screens Menu</Text>
		<Link href="/screens/login">
		  <Button title="Login" />
		</Link>
	  </View>
	);
  }