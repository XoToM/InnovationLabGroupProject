
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Button,Image, StyleSheet,FlatList, Platform, Pressable } from 'react-native';
import Mapbox, {Camera, LocationPuck, MapView,MarkerView,PointAnnotation,StyleURL} from "@rnmapbox/maps";
import Constants from 'expo-constants';
import { Entypo, Ionicons } from '@expo/vector-icons';

import * as Location from "expo-location";
Location.requestForegroundPermissionsAsync();

if(Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN){
	Mapbox.setAccessToken(Constants.expoConfig.extra.MAPBOX_ACCESS_TOKEN);	//	insert mapbox public token here
	Mapbox.setTelemetryEnabled(false);
}


const styles = StyleSheet.create({
	mapMenu:{
		color:"black",
		backgroundColor:"white"
	},
	header:{
		fontSize:35
	},
	subtitle:{
		fontSize:20
	}
});

function LocationPreview({info}:any){
	
	const [imageRatio, setImageRatio] = useState(1);
	useEffect(()=>{
		Image.getSize(info.img,(w,h)=>{
			setImageRatio(w/h)
		});
	},[]);

	return <View>
		<Image source={{
          uri: info.img,
        }} style={{
			height: 100,
			resizeMode:"contain",
			aspectRatio:imageRatio
		  }}/>
		<Text style={styles.subtitle}>{info.name}</Text>
	</View>
}

export default function ScreenMap() {
	const router = useRouter();
	const locations = [
		{name:"Park", pos:[51.37692748456796, -2.436908958136046], img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Halleyparknovember_b.jpg/800px-Halleyparknovember_b.jpg"},
		{name:"Castle1",pos:[51.379306590874634, -2.354695695635474], img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"},
		{name:"Castle2",pos:[52.956237708377174, 4.760612002768222], img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"},
		{name:"Castle3",pos:[35.68616796711613, 139.75224497059952], img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"}
		];
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN?(
				<MapView style={StyleSheet.absoluteFillObject} compassEnabled={true}>
					
					<Camera defaultSettings={{ centerCoordinate: [0,0], zoomLevel: 9 }}/>
					
					{
						locations.map((loc,i)=>{
							return	<PointAnnotation key={i+">"+loc.name} id={""+i} coordinate={[loc.pos[1], loc.pos[0]]} anchor={{x:0.5,y:1}} onSelected={()=>
								router.push({
									pathname: '/screens/place',
									params: {
									  name: loc.name,
									  formattedAddress: "ADDRESS_HERE",
									  latitude: loc.pos[0],
									  longitude: loc.pos[1],
									}})
							}>
										<Entypo name="location-pin" size={64} color="orange" />
								</PointAnnotation>;
						})
					}
					<LocationPuck visible={true} puckBearing='heading' puckBearingEnabled={true}/>
				</MapView>):<Text style={StyleSheet.absoluteFillObject}>No tokens provided</Text>
			}
			{/*
			// topImage='../../assets/images/icon.png'
			<View style={[styles.mapMenu, {padding:10}]}> styleURL={StyleURL.Street}
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
			</View>
			
			
			<Pressable onPress={()=>{
											console.log("Bruh");
											);
											}}>
										</Pressable>
			*/}
		</View>
	);
}