import { Redirect } from "expo-router";
import React from "react";

export let setTheme: any = null;

export default function ScreensInitial() {
	return <Redirect href={"/map"}/>;	//	Left here in case we want to quickly add in a welcome screen. Currently just redirects to the map screen
}
