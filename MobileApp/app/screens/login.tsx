"use client";

import { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, commonStyles } from "@/common/common";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAuth } from "@/constants/auth-context";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn } = useAuth();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  async function handleLogin() {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) Alert.alert("Login Failed", error);
      else router.replace("/screens/map");
    } catch (err) {
      Alert.alert("Error", "Unexpected error during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[commonStyles.container, { backgroundColor: "#ffffcc" }]}
    >
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        <View style={commonStyles.logoContainer}>
          <View
            style={[
              commonStyles.logoCircle,
              { backgroundColor: "#ffcc00", shadowOpacity: 0.2 },
            ]}
          >
            <Text style={{ color: "#000", fontSize: 40, fontWeight: "bold" }}>
              A
            </Text>
          </View>
          <Text style={[commonStyles.logoText, { color: "#000" }]}>
            EquiMap
          </Text>
        </View>

        <Text style={[commonStyles.title, { color: "#000" }]}>
          Welcome Back
        </Text>
        <Text style={[commonStyles.subtitle, { color: "#333" }]}>
          Sign in to your account to continue
        </Text>

        <View style={commonStyles.formContainer}>
          <Input
            placeholder="Email"
            placeholderTextColor="#ffffffcc"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="mail" size={20} color="#fff" />
              </View>
            }
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={[
              commonStyles.inputContainer,
              {
                backgroundColor: "#99cc66",
                borderColor: errors.email ? "#ef4444" : "transparent",
                borderWidth: errors.email ? 1.5 : 0,
              },
            ]}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#99cc66",
            }}
            inputStyle={{ color: "#fff" }}
            onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
          />
          {errors.email ? (
            <Text style={commonStyles.errorText}>{errors.email}</Text>
          ) : null}

          <Input
            placeholder="Password"
            placeholderTextColor="#ffffffcc"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="lock" size={20} color="#fff" />
              </View>
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                testID="password-visibility-toggle"
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            }
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
            value={password}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            containerStyle={[
              commonStyles.inputContainer,
              {
                backgroundColor: "#99cc66",
                borderColor: errors.password ? "#ef4444" : "transparent",
                borderWidth: errors.password ? 1.5 : 0,
              },
            ]}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#99cc66",
            }}
            inputStyle={{ color: "#fff" }}
            onBlur={() =>
              setErrors({ ...errors, password: validatePassword(password) })
            }
          />
          {errors.password ? (
            <Text style={commonStyles.errorText}>{errors.password}</Text>
          ) : null}

          <Button
            title="Sign In"
            testID="login-submit-btn"
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
            accessibilityState={{ disabled: loading }}
            loadingProps={{ color: "black", size: "small" }}
            buttonStyle={{
              backgroundColor: "#ffcc00",
              borderRadius: 12,
              height: 56,
              marginTop: 16,
            }}
            titleStyle={{ color: "#000", fontWeight: "600" }}
            disabledStyle={{ backgroundColor: "#ffcc00aa" }}
          />

          <View style={commonStyles.dividerContainer}>
            <View style={commonStyles.divider} />
            <Text style={[commonStyles.dividerText, { color: "#333" }]}>
              OR
            </Text>
            <View style={commonStyles.divider} />
          </View>

          <View style={commonStyles.socialButtonsContainer}>
            <Button
              title="Continue with Google"
              icon={
                <View style={commonStyles.iconContainer}>
                  <AntDesign name="google" size={22} color="#000" />
                </View>
              }
              buttonStyle={{
                backgroundColor: "#ffcc00",
                borderRadius: 12,
                height: 56,
                marginTop: 12,
              }}
              titleStyle={{ color: "#000", fontWeight: "500", fontSize: 15 }}
            />
            <Button
              title="Continue with Apple"
              icon={
                <View style={commonStyles.iconContainer}>
                  <AntDesign name="apple1" size={22} color="black" />
                </View>
              }
              buttonStyle={{
                backgroundColor: "#ffcc00",
                borderRadius: 12,
                height: 56,
                marginTop: 12,
              }}
              titleStyle={{ color: "#000", fontWeight: "500", fontSize: 15 }}
            />
          </View>

          <View style={commonStyles.footerContainer}>
            <Text style={[commonStyles.footerText, { color: "#333" }]}>
              Don't have an account?{" "}
            </Text>
            <Link href="/screens/signup">
              <Text style={[commonStyles.footerLink, { color: "#000" }]}>
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
