
import { Entypo } from '@expo/vector-icons';
//	Causes warnings to appear. It looks like rnmapbox has quite a few bugs atm
import Mapbox, { Camera, LocationPuck, MapView, MarkerView, PointAnnotation } from "@rnmapbox/maps";
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, DimensionValue, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { H1, H2 } from '@/components/text';
import { CardView } from '@/components/views';
import { useTheme } from '@/context/ThemeContext';
import * as Location from "expo-location";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
	const [prevShowMenu,setPrevShowMenu] = useState(true);
	let animated_pos = new Animated.Value(-600);


	let [showFeatured, setShowFeatured] = useState(true);
	let safeAreaPadding = useSafeAreaInsets();
	let featuredPos:DimensionValue = showFeatured?0:"-60%";

	useEffect(()=>{
		if(prevShowMenu.valueOf()){
			setPrevShowMenu(false);
			return;
		}
		console.log(Mapbox.StyleURL.Street);
		if(showFeatured.valueOf()){
			animated_pos.setValue(0);
			Animated.timing(animated_pos, {
				useNativeDriver: false,
				toValue: -600+safeAreaPadding.bottom
			}).start();
		}else {
			animated_pos.setValue(-600+safeAreaPadding.bottom);
			Animated.timing(animated_pos, {
				useNativeDriver: false,
				toValue: 0
			}).start();
		}
	},[showFeatured, animated_pos]);

	let [locations, setLocations]:[any,any] = useState([]);
	let locationsInfo = locations.slice(0,5);

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
				let places = shuffle(data.places);
				setLocations(places);
			}else{
				console.warn(`Failed to fetch recommended locations: ${await response.text()}`);
			}
		});
	},[]);
	//styleURL='mapbox://styles/qbit1103/cm8zw2f22005l01sd70eu9cve'
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN?(
				<MapView style={StyleSheet.absoluteFillObject} compassEnabled={true} attributionPosition={{top: 32, left: 8}} logoPosition={{top: 32, left: 32}}>
					<Camera defaultSettings={{ centerCoordinate: [-2.3643467114359953, 51.378860189408165], zoomLevel: 13 }}/>
					{
						locations.map((loc:any,i:number)=>{
							return	<PointAnnotation key={i + ">" + loc.name} id={"" + i} coordinate={[loc.longitude, loc.latitude]} anchor={{ x: 0.5, y: 1 }} onSelected={
								() => router.push({
								pathname: '/screens/place',
								params: loc
							})}>
								<Entypo name="location-pin" size={48} color="green" />
								</PointAnnotation>;
						})
					}
					<LocationPuck visible={true} puckBearing='heading' puckBearingEnabled={true}/>
				</MapView>):<Text style={StyleSheet.absoluteFillObject}>No tokens provided</Text>
			}
			<Animated.View style={{padding:10,position:"absolute",width:"100%", maxHeight:"90%", bottom:animated_pos, backgroundColor:theme.background}}>
				<TouchableOpacity style={{ padding: 15, borderRadius: 50, elevation: 3,position:"absolute",marginLeft:5,marginTop:-64,backgroundColor:theme.background}}><Entypo name="location" size={24} color="black" /></TouchableOpacity>
				<TouchableOpacity onPress={()=>{setShowFeatured(!showFeatured);}}>
					<View style={{flex:1, flexDirection:'row', justifyContent:"space-between",paddingHorizontal:10}}>
						<H1 style={{marginBottom:20}}>Featured</H1>
						{
							showFeatured?<AntDesign name="down" size={48} color="black" />:<AntDesign name="up" size={48} color="black" />
						}
						</View>
				</TouchableOpacity>
				<FlatList style={{padding:10}} contentContainerStyle={{gap:10}} scrollEnabled={true} horizontal={false} data={locationsInfo} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
			</Animated.View>
		</View>
	);
}