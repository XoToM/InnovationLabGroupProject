import { StyleContext } from "@/constants/themes/theme_provider";
import { useContext } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";

import BaseTheme from "@/constants/themes/base";

export function Title({children,style}:{children:string,style?:any}){
	let style_ctx = useContext(StyleContext);
	if(style){
		return <Text style={[BaseTheme.title,style_ctx.title, style]}>{children}</Text>
	}
	return <Text style={[BaseTheme.title,style_ctx.title]}>{children}</Text>;
}

export function H1({children,style}:{children:string,style?:any}){
	let style_ctx = useContext(StyleContext);
	if(style){
		return <Text style={[BaseTheme.h1,style_ctx.h1, style]}>{children}</Text>
	}
	return <Text style={[BaseTheme.h1,style_ctx.h1]}>{children}</Text>;
}
export function H2({children,style}:{children:string,style?:any}){
	let style_ctx = useContext(StyleContext);
	if(style){
		return <Text style={[BaseTheme.h2,style_ctx.h2, style]}>{children}</Text>
	}
	return <Text style={[BaseTheme.h2,style_ctx.h2]}>{children}</Text>;
}
export function H3({children,style}:{children:string,style?:any}){
	let style_ctx = useContext(StyleContext);
	if(style){
		return <Text style={[BaseTheme.h3,style_ctx.h3, style]}>{children}</Text>
	}
	return <Text style={[BaseTheme.h3,style_ctx.h3]}>{children}</Text>;
}
export function P({children,style}:{children:string,style?:any}){
	let style_ctx = useContext(StyleContext);
	if(style){
		return <Text style={[BaseTheme.p,style_ctx.p, style]}>{children}</Text>
	}
	return <Text style={[BaseTheme.p,style_ctx.p]}>{children}</Text>;
}