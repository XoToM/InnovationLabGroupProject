
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Button,Image, StyleSheet,FlatList, Platform } from 'react-native';
import Mapbox, {Camera, LocationPuck, MapView,MarkerView,StyleURL} from "@rnmapbox/maps";
import Constants from 'expo-constants';

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
	let locations1 = [
		{name:"Park", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Halleyparknovember_b.jpg/800px-Halleyparknovember_b.jpg"},
		{name:"Castle", img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"},
		{name:"Castle", img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"},
		{name:"Castle", img:"https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/sussex/places/bodiam-castle/library/winter/bodiam-castle-and-moat-in-winter-1456846.jpg"}
		];
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN?<MapView style={StyleSheet.absoluteFillObject}>
			{/*
				<MarkerView coordinate={[0,0]}>
					<View style={{ 
							alignItems: 'center',
							backgroundColor: 'red',
							borderRadius: 30,
							bottom: 16,
							justifyContent: 'center',
							left: 48,
							minHeight: 60,
							paddingVertical: 16,
							position: 'absolute',
							right: 48
						}}>
						<LocationPuck
							topImage="topImage"
							visible={true}
							scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
							pulsing={{
								isEnabled: true,
								color: 'teal',
								radius: 50.0,
							}}
						/>
						<Text>Tap on map to add a point annotation</Text>
					</View>
				</MarkerView>
						*/}
				<Camera followUserLocation={true}/>
			</MapView>:<Text style={StyleSheet.absoluteFillObject}>No tokens provided</Text>}
			{/*<View style={[styles.mapMenu, {padding:10}]}> styleURL={StyleURL.Street}
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
			</View>*/}
		</View>
	);
}