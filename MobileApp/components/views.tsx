import { View, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import React from 'react';

interface BackgroundViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function BackgroundView({ children, style }: BackgroundViewProps) {
  const { theme } = useTheme();
  return <View style={[{ flex: 1, backgroundColor: theme.background }, style]}>{children}</View>;
}

interface CardViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardView({ children, style }: CardViewProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.card,
          borderRadius: 10,
          padding: 10,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}