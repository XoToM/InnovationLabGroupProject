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
}
