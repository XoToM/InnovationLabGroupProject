import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function ScreensMenu() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screens Menu</Text>

      <Button title="Login" onPress={() => router.push("./login")} />
      <Button title="Signup" onPress={() => router.push("./signup")} />
      <Button title="Map" onPress={() => router.push("./map")} />
      <Button title="Place" onPress={() => router.push("./place")} />
      <Button title="Settings" onPress={() => router.push("./settings")} />
      <Button title="Filter" onPress={() => router.push("./filter-places")} />
      <Button title="Places" onPress={() => router.push("./places")} />
    </View>
  );
}
