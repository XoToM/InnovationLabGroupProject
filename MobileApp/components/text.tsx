<<<<<<< HEAD
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
=======
import { StyleContext } from "@/constants/themes/theme_provider";
import { useContext } from "react";
import { Text } from "react-native";
import BaseTheme from "@/constants/themes/base";
import type { ReactNode } from "react";

type TextProps = {
  children?: ReactNode;
  style?: any;
};

export function Title({ children, style }: TextProps) {
  const style_ctx = useContext(StyleContext) || {};
  return (
    <Text style={[BaseTheme.title, style_ctx?.title || {}, style]}>
      {children}
    </Text>
  );
}

export function H1({ children, style }: TextProps) {
  const style_ctx = useContext(StyleContext) || {};
  return (
    <Text style={[BaseTheme.h1, style_ctx?.h1 || {}, style]}>{children}</Text>
  );
}

export function H2({ children, style }: TextProps) {
  const style_ctx = useContext(StyleContext) || {};
  return (
    <Text style={[BaseTheme.h2, style_ctx?.h2 || {}, style]}>{children}</Text>
  );
}

export function H3({ children, style }: TextProps) {
  const style_ctx = useContext(StyleContext) || {};
  return (
    <Text style={[BaseTheme.h3, style_ctx?.h3 || {}, style]}>{children}</Text>
  );
}

export function P({ children, style }: TextProps) {
  const style_ctx = useContext(StyleContext) || {};
  return (
    <Text style={[BaseTheme.p, style_ctx?.p || {}, style]}>{children}</Text>
  );
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
}
