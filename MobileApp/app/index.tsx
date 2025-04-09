import { useEffect } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { View, Text } from "react-native";

export default function ScreensInitial() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      router.replace("/screens/login");
    }
  }, [navigationState?.key]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text></Text>
    </View>
  );
}