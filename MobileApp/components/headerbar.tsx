import React, { useEffect } from "react";
import { Title } from "./text";
import { CardView } from "./views";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function HeaderBar({ navigation, route, options, back }:any){
	const router = useRouter();
	const { theme } = useTheme();

	let title = null;
	switch (route.name){
		case "screens/place":
			title = route.params.name;
			break;
			default:
				title = route.name;
				break;
	}
	console.log("Route changed: ",route);
	
	return <SafeAreaView edges={["top","left","right"]} style={{height:110}}>
			<CardView style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%",borderRadius:0}}>
				{
					navigation.canGoBack()?
					<TouchableOpacity
						onPress={()=>{router.back()}}
						accessible={true}
						accessibilityLabel="Back"
						style={{marginHorizontal:10}}
						>
						<Ionicons name="arrow-back" size={50} color={theme.text} />
					</TouchableOpacity>
					:
					<TouchableOpacity
						onPress={()=>{router.push("/screens/filter-places")}}
						accessible={true}
						accessibilityLabel="Search"
						style={{borderColor:"#000000",marginHorizontal:10}}
						>
						<FontAwesome name="search" size={48} color={theme.text} />
					</TouchableOpacity>

				}
				<View style={{flexShrink:1,width:"100%",marginHorizontal:10}}>
					<Title adjustsFontSizeToFit={true} style={{textAlign:"center", textAlignVertical:"center"}}>{title}</Title>
				</View>
				<TouchableOpacity
					onPress={()=>{router.push("/screens/settings")}}
					accessible={true}
					accessibilityLabel="Settings"
					style={{borderColor:"black",marginHorizontal:10}}>
						<FontAwesome name="gear" size={50} color={theme.text} />
				</TouchableOpacity>
			</CardView></SafeAreaView>;
}