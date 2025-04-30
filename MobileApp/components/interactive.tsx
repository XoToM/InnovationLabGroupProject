import { StyleContext } from "@/constants/themes/theme_provider";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { TouchableOpacity, View,Text, Switch } from "react-native";
import BaseTheme from "@/constants/themes/base";



export function TextBtn({children, style,textStyle,onClick,icon,iconSize=20}:any){
	let style_ctx = useContext(StyleContext);
	return <TouchableOpacity style={[BaseTheme.button,style_ctx.button, style]} onPress={onClick} accessible={true} accessibilityLabel={children}>
			{
				(icon)?<Ionicons name={icon} size={iconSize}/>:<></>
			}
			<Text style={[BaseTheme.buttonText,style_ctx.buttonText,textStyle]}>{children}</Text>
		</TouchableOpacity>;
}

export function Toggle({label, onChange, value}:any){
	let style_ctx = useContext(StyleContext);
	return <View style={[BaseTheme.toggleContainer, style_ctx.toggleContainer]}>
		<Switch accessible={true} accessibilityLabel={label} style={[BaseTheme.toggle, style_ctx.toggle]} value={value} onValueChange={onChange}/>
			<Text style={[BaseTheme.toggleLabel, style_ctx.toggleLabel]}>{label}</Text>
		</View>;
}