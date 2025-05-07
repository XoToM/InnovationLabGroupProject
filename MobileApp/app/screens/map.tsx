
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button,Image, StyleSheet,FlatList, Platform, Pressable, TouchableOpacity, DimensionValue, useAnimatedValue, Animated, Easing } from 'react-native';
import Mapbox, {Camera, LocationPuck, MapView,MarkerView,PointAnnotation,StyleURL} from "@rnmapbox/maps";
import Constants from 'expo-constants';
import { Entypo, Ionicons } from '@expo/vector-icons';

import * as Location from "expo-location";
import { H1, H2, H3, P } from '@/components/text';
import { BackgroundView, CardView } from '@/components/views';
import { useTheme } from '@/context/ThemeContext';
Location.requestForegroundPermissionsAsync();

if(Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN){
	Mapbox.setAccessToken(Constants.expoConfig.extra.MAPBOX_ACCESS_TOKEN);	//	insert mapbox public token here
	Mapbox.setTelemetryEnabled(false);
}

function LocationPreview({info}:any){
	const [imageRatio, setImageRatio] = useState(1);
	const router = useRouter();
	useEffect(()=>{
		Image.getSize(info.photo,(w,h)=>{
			setImageRatio(w/h)
		});
	},[]);

	return <TouchableOpacity onPress={()=>router.push({pathname:"/screens/place",params:info})} accessibilityLabel={info.name} accessible={true}>
		<CardView style={{flex:1,flexDirection:"column",gap:20, padding:20}}>
			<Image source={{
			uri: info.photo,
			}} style={{
				width:"100%",
				resizeMode:"contain",
				aspectRatio:imageRatio
			}}/>
			<H2>{info.name}</H2>
		</CardView>
	</TouchableOpacity>
}

export default function ScreenMap() {
	const router = useRouter();
	const { theme } = useTheme();
	let animated_pos = new Animated.Value(-600);

	// animated_pos.interpolate({
	// 	inputRange: [0,1],
	// 	outputRange:[ 0,400],
	// });

	let [showFeatured, setShowFeatured] = useState(false);
	let featuredPos:DimensionValue = showFeatured?0:"-60%";

	useEffect(()=>{
		if(showFeatured.valueOf()){
			animated_pos.setValue(0);
			Animated.timing(animated_pos, {
				useNativeDriver: false,
				toValue: -600
			}).start();
		}else{
			animated_pos.setValue(-600);
			Animated.timing(animated_pos, {
				useNativeDriver: false,
				toValue: 0
			}).start();
		}
	},[showFeatured, animated_pos]);
	//let featuredPos = useAnimatedValue(-300);
	//	let locations = [
	// 		{name:"Park", latitude:51.37692748456796, longitude:-2.436908958136046, image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Halleyparknovember_b.jpg/800px-Halleyparknovember_b.jpg", formattedAddress: "ADDRESS_HERE"},
	// 		{name:"Castle1",latitude:51.379306590874634, longitude: -2.354695695635474, image:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg", formattedAddress: "ADDRESS_HERE"},
	// 		{name:"Castle2",latitude:52.956237708377174, longitude: 4.760612002768222, image:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg", formattedAddress: "ADDRESS_HERE"},
	// 		{name:"Castle3",latitude:35.68616796711613, longitude: 139.75224497059952, image:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg", formattedAddress: "ADDRESS_HERE"},
	// 		{name:"Castle4",latitude:35.68616796711613, longitude: 139.75224497059952, image:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg", formattedAddress: "ADDRESS_HERE"},
	// 	];

	// useEffect(()=>{
	// 	Animated.timing(animated_pos, {
	// 		toValue: showFeatured?0:-200,
	// 		duration: 1,
	// 		useNativeDriver:true
	// 	}).start();
	// },[animated_pos,showFeatured]);

	let [locations, setLocations]:[any,any] = useState([]);

	function shuffle(arr:any[]){
		for (let i=0;i<arr.length;i++){
			let other = Math.floor(Math.random()*arr.length);
			let tmp = arr[i];
			arr[i] = arr[other];
			arr[other] = tmp;
		}
		return arr;
	}

	useEffect(()=>{
		fetch("https://katestudent.pythonanywhere.com:443/places").then(async (response)=>{
			if (response.ok){
				let data = await response.json();
				let places = shuffle(data.places).slice(0,5);
				setLocations(places);
			}else{
				console.warn(`Failed to fetch recommended locations: ${await response.text()}`);
			}
		});
	},[]);
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN?(
				<MapView style={StyleSheet.absoluteFillObject} compassEnabled={true}>
					
					<Camera defaultSettings={{ centerCoordinate: [-2.3643467114359953, 51.378860189408165], zoomLevel: 12 }}/>
					{
						locations.map((loc:any,i:number)=>{
							return	<PointAnnotation key={i+">"+loc.name} id={""+i} coordinate={[loc.longitude, loc.latitude]} anchor={{x:0.5,y:1}} onSelected={()=>
								router.push({
									pathname: '/screens/place',
									params: loc})
							}>
										<Entypo name="location-pin" size={64} color="orange" />
								</PointAnnotation>;
						})
					}
					<LocationPuck visible={true} puckBearing='heading' puckBearingEnabled={true}/>
				</MapView>):<Text style={StyleSheet.absoluteFillObject}>No tokens provided</Text>
			}
			<Animated.View style={{padding:10,position:"absolute",width:"100%", maxHeight:"90%", bottom:animated_pos, backgroundColor:theme.background}}>
				<TouchableOpacity onPress={()=>{setShowFeatured(!showFeatured);}}>
					<H1 style={{marginBottom:20}}>Featured</H1>
				</TouchableOpacity>
				<FlatList style={{padding:10}} contentContainerStyle={{gap:10}} scrollEnabled={true}  horizontal={false} data={locations} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
			</Animated.View>
		</View>
	);
}