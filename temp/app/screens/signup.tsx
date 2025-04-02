import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define navigation types
type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const Signup: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Signing up with:", name, email, password);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign-Up</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.welcomeText}>
        Create Your <Text style={styles.brandText}>EquiMap</Text> Account
      </Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
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
});

export default Signup;
