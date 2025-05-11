import { Text } from "react-native";
import { useTheme } from '../context/ThemeContext';
import BaseTheme from "@/constants/themes/base";
import type { ReactNode } from "react";

export function Title({children,style}:{children:string,style?:any}){
	const { theme } = useTheme();
	return <Text style={[BaseTheme.title, { color: theme.text }, style]}>{children}</Text>;
}

export function H1({ children, style }: { children: string; style?: any }) {
	const { theme } = useTheme();
	return <Text style={[BaseTheme.h1, { color: theme.text }, style]}>{children}</Text>;
}
  
export function H2({ children, style }: { children: string; style?: any }) {
	const { theme } = useTheme();
	return <Text style={[BaseTheme.h2, { color: theme.text }, style]}>{children}</Text>;
}
  
export function H3({ children, style }: { children: string; style?: any }) {
	const { theme } = useTheme();
	return <Text style={[BaseTheme.h3, { color: theme.text }, style]}>{children}</Text>;
}
  
export function P({ children, style }: { children: string; style?: any }) {
	const { theme } = useTheme();
	return <Text style={[BaseTheme.p, { color: theme.text }, style]}>{children}</Text>;
}
