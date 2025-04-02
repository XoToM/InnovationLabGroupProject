import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define navigation types
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    console.log("Logging in with:", email, password);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Log In</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.welcomeText}>
        Welcome Back to <Text style={styles.brandText}>EquiMap</Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => alert("Reset password functionality")}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  welcomeText: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  brandText: { color: "#005f73", fontWeight: "bold" },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10, backgroundColor: "#f0f0f0" },
  button: { backgroundColor: "#005f73", padding: 10, borderRadius: 5, alignItems: "center", width: "100%" },
  buttonText: { color: "white", fontWeight: "bold" },
  forgotPassword: { marginTop: 10, color: "blue" },
});

export default Login;
