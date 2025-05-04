import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../context/ThemeContext';
import { TouchableOpacity, View,Text, Switch } from "react-native";
import BaseTheme from "@/constants/themes/base";



export function TextBtn({children, style,textStyle,onClick,icon,iconSize=20}:any){
	const { theme } = useTheme();
	return (
		<TouchableOpacity 
			style={[BaseTheme.button,{ backgroundColor: theme.primary, color: theme.text }, style]} 
			onPress={onClick} 
			accessible={true} 
			accessibilityLabel={children}>
			{
				(icon)?<Ionicons name={icon} size={iconSize} color={theme.icon} />:<></>
			}
			<Text style={[BaseTheme.buttonText,{ color: theme.text },textStyle]}>{children}</Text>
		</TouchableOpacity>
	)
}

export function Toggle({label, onChange, value}:any){
	const { theme } = useTheme();
	return (
		<View style={[BaseTheme.toggleContainer]}>
			<Switch 
			accessible={true} 
			accessibilityLabel={label} 
			style={[BaseTheme.toggle]} value={value} onValueChange={onChange}/>
			<Text style={[BaseTheme.toggleLabel, { color: theme.text }]}>{label}</Text>
		</View>
	)
}