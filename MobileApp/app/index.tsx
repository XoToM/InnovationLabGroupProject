
import { useEffect } from "react";
import { useRouter, useRootNavigationState, SplashScreen, Link } from "expo-router";
import { View, Text } from "react-native";

export default function ScreensInitial() {
 // const router = useRouter();
  //const navigationState = useRootNavigationState();
  
	SplashScreen.hideAsync();
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text style={{color:"red"}}>Initial screen</Text>
		<Link href="/screens/menu"><Text>Click here to go to menu. TODO: Make this redirect to main map/welcome/login screen instead</Text></Link>
	  </View>
	);
}
