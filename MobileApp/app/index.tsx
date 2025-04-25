
import { useEffect, useState } from "react";
import { useRouter, useRootNavigationState, SplashScreen, Link } from "expo-router";
import { View, Text } from "react-native";
import LightTheme from "@/constants/themes/light";
import DarkTheme from "@/constants/themes/dark";
import { H1, H2, H3, P, Title } from "@/components/text";
import { StyleContext } from "@/constants/themes/theme_provider";
import { TextBtn, Toggle } from "@/components/interactive";

export let setTheme:any = null;

export default function ScreensInitial() {
 // const router = useRouter();
  //const navigationState = useRootNavigationState();
  
	const [theme, themeSetter] = useState(LightTheme);
	setTheme = themeSetter;

	SplashScreen.hideAsync();

	

	let [tog,togset] = useState(false);

	return (
		<StyleContext.Provider value={theme}>
			<View style={[theme.background,{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
			
				<Title style={{color:"red"}}>Initial screen</Title>
				<Link href="/screens/menu"><P>Click here to go to menu. TODO: Make this redirect to main map/welcome/login screen instead</P></Link>
				
				<H1>Header 1 Example</H1>
				<H2>Header 2 Example</H2>
				<H3>Header 3 Example</H3>
				<P>{"Multiline Paragraph nr1\nIs still going strong over here"}</P>
				<P>{"Multiline Paragraph nr2\nIs still going strong over here"}</P>
				<TextBtn icon="home" style={{width:"100%"}} onClick={()=>console.log("Clicked")}>Sample Text</TextBtn>
				<Toggle label="Dark Theme Toggle" value={tog} onChange={(v:boolean)=>{setTheme(v?DarkTheme:LightTheme);togset(v)}}></Toggle>
			{/*
				title:{
					color:"red"
				},
				h1:{
					color:"green"
				},
				h2:{
					color:"green"
				},
				h3:{
					color:"green"
				},
				box:{},
				button:{}
			}}>
				<Box style={{marginTop:"1em"}}>
					<H1>Header 1</H1>
					<H2>Header 2</H2>
					<H3>Header 3</H3>
					<Button>Button</Button>
				</Box>
			*/}
		</View>
	  </StyleContext.Provider>
	);
}
