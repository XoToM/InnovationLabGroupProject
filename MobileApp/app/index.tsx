import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';


export default function ScreensInitial() {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Initial screen</Text>
		<Link href="/screens/map">Click here to go to menu. TODO: Make this redirect to main map/welcome/login screen instead</Link>
	  </View>
	);
  }