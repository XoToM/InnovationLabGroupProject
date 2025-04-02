
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button,Image, StyleSheet,FlatList } from 'react-native';


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
			<View style={[styles.mapMenu, {padding:10}]}>
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
				<Text style={styles.header}>Featured</Text>
				<FlatList horizontal={true} data={locations1} renderItem={(i)=><LocationPreview info={i.item}/>} ItemSeparatorComponent={() => <View style={{height:1,width: 10}} />}/>
			</View>
		</View>
	);
}