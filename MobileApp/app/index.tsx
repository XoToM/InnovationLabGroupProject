import { useState } from "react";
import { SplashScreen, Link } from "expo-router";
import { View } from "react-native";
import LightTheme from "@/constants/themes/light";
import DarkTheme from "@/constants/themes/dark";
import { H1, H2, H3, P, Title } from "@/components/text";
import { TextBtn, Toggle } from "@/components/interactive";

export let setTheme: any = null;

export default function ScreensInitial() {
<<<<<<< HEAD
	const [theme, themeSetter] = useState(LightTheme);
	setTheme = themeSetter;

  SplashScreen.hideAsync();

	let [tog, togset] = useState(false);

	return (
		<View style={[theme.background, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>

			<Title style={{ color: "red" }}>Initial screen</Title>
			<Link href="/screens/menu"><P>Click here to go to menu. TODO: Make this redirect to main map/welcome/login screen instead</P></Link>

			<H1>Header 1 Example</H1>
			<H2>Header 2 Example</H2>
			<H3>Header 3 Example</H3>
			<P>{"Multiline Paragraph nr1\nIs still going strong over here"}</P>
			<P>{"Multiline Paragraph nr2\nIs still going strong over here"}</P>
			<TextBtn icon="home" style={{ width: "100%" }} onClick={() => console.log("Clicked")}>Sample Text</TextBtn>
			<Toggle label="Dark Theme Toggle" value={tog} onChange={(v: boolean) => { setTheme(v ? DarkTheme : LightTheme); togset(v) }}></Toggle>
		</View>
	);
=======
  const [theme, themeSetter] = useState(LightTheme);
  setTheme = themeSetter;

  SplashScreen.hideAsync();

  let [tog, togset] = useState(false);

  return (
    <View
      style={[
        theme.background,
        { flex: 1, alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Title style={{ color: "red" }}>Initial screen</Title>
      <Link href="./menu">
        <P>
          Click here to go to menu. TODO: Make this redirect to main
          map/welcome/login screen instead
        </P>
      </Link>

      <H1>Header 1 Example</H1>
      <H2>Header 2 Example</H2>
      <H3>Header 3 Example</H3>
      <P>{"Multiline Paragraph nr1\nIs still going strong over here"}</P>
      <P>{"Multiline Paragraph nr2\nIs still going strong over here"}</P>
      <TextBtn
        icon="home"
        style={{ width: "100%" }}
        onClick={() => console.log("Clicked")}
      >
        Sample Text
      </TextBtn>
      <Toggle
        label="Dark Theme Toggle"
        value={tog}
        onChange={(v: boolean) => {
          setTheme(v ? DarkTheme : LightTheme);
          togset(v);
        }}
      ></Toggle>
    </View>
  );
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
}
