import { Link, SplashScreen } from 'expo-router';
import { View, Text, Button,StyleSheet } from 'react-native';


export default function ScreensInitial() {
	SplashScreen.hideAsync();
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text style={{color:"red"}}>Initial screen</Text>
		<Link href="/screens/menu">Click here to go to menu. TODO: Make this redirect to main map/welcome/login screen instead</Link>
	  </View>
	);
  }