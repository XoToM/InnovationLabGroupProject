import { Redirect } from "expo-router";

export let setTheme: any = null;

export default function ScreensInitial() {
	return <Redirect href={"/map"}/>


}
