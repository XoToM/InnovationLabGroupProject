"use client";

import { useState } from "react";
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
import { useAuth } from "./context";
import { colors, commonStyles } from "../common";
import { Feather, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect } from "react";

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
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation<LoginScreenNavigationProp>();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const { signIn } = useAuth();

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

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  async function handleLogin() {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        Alert.alert("Error", error);
      } else {
        console.log("Login success! Navigating...");
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={commonStyles.container}
    >
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        <View style={commonStyles.logoContainer}>
          <LinearGradient
            colors={colors.gradient}
            style={commonStyles.logoCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
              A
            </Text>
          </LinearGradient>
          <Text style={commonStyles.logoText}>EquiMap</Text>
        </View>

        <Text style={commonStyles.title}>Welcome Back</Text>
        <Text style={commonStyles.subtitle}>
          Sign in to your account to continue
        </Text>

        <View style={commonStyles.formContainer}>
          <Input
            placeholder="Email"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="mail" size={20} color={colors.textLight} />
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
              errors.email ? commonStyles.inputContainerError : null,
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={commonStyles.inputStyle}
            onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
          />
          {errors.email ? (
            <Text style={commonStyles.errorText}>{errors.email}</Text>
          ) : null}

          <Input
            placeholder="Password"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="lock" size={20} color={colors.textLight} />
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
                  color={colors.textLight}
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
              errors.password ? commonStyles.inputContainerError : null,
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={commonStyles.inputStyle}
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
            loadingProps={{ color: "white", size: "small" }}
            buttonStyle={commonStyles.button}
            titleStyle={commonStyles.buttonTitle}
            disabledStyle={{ backgroundColor: colors.primary + "80" }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: colors.gradient,
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
          />

          <View style={commonStyles.dividerContainer}>
            <View style={commonStyles.divider} />
            <Text style={commonStyles.dividerText}>OR</Text>
            <View style={commonStyles.divider} />
          </View>

          <View style={commonStyles.socialButtonsContainer}>
            <Button
              title="Continue with Google"
              icon={
                <View style={commonStyles.iconContainer}>
                  <AntDesign name="google" size={22} color="#DB4437" />
                </View>
              }
              buttonStyle={commonStyles.socialButton}
              titleStyle={commonStyles.socialButtonTitle}
            />
            <Button
              title="Continue with Apple"
              icon={
                <View style={commonStyles.iconContainer}>
                  <AntDesign name="apple1" size={22} color="black" />
                </View>
              }
              buttonStyle={commonStyles.socialButton}
              titleStyle={commonStyles.socialButtonTitle}
            />
          </View>

          <View style={commonStyles.footerContainer}>
            <Text style={commonStyles.footerText}>Don't have an account? </Text>
            <Link href="/screens/signup">
              <Text style={commonStyles.footerLink}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}