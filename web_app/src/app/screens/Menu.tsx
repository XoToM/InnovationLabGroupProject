import Link from "next/link";
import React from "react";

function ScreenMenuItem({name,link}:{name:string,link:string}){
	return <Link href={link}>{name}</Link>
}

function Menu(){
	return <>
		<ScreenMenuItem name="Login" link="/screens/login"></ScreenMenuItem>
		<ScreenMenuItem name="Settings" link="/screens/settings"></ScreenMenuItem>
		<ScreenMenuItem name="Map" link="/screens/map"></ScreenMenuItem>
	</>;
}

export default Menu;