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

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, loading: contextLoading } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const loading = contextLoading ?? localLoading;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigation = useNavigation<SignupScreenNavigationProp>();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateName = (name: string) => {
    if (!name) return "Name is required";
    if (/\d/.test(name)) return "Name must not contain numbers";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
  };

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

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return !nameError && !emailError && !passwordError && !confirmPasswordError;
  };

  async function handleSignup() {
    if (!validateForm()) return;

    setLocalLoading(true);

    try {
      const { error } = await signUp(name, email, password);

      if (error) {
        Alert.alert("Error", error);
      } else {
        Alert.alert("Success", "Account created successfully! Please sign in.");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setLocalLoading(false);
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

        <Text style={commonStyles.title}>Create Account</Text>
        <Text style={commonStyles.subtitle}>
          Sign up to get started with all our features
        </Text>

        <View style={commonStyles.formContainer}>
          <Input
            placeholder="Full Name"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="user" size={20} color={colors.textLight} />
              </View>
            }
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            value={name}
            autoCapitalize="words"
            containerStyle={[
              commonStyles.inputContainer,
              errors.name ? commonStyles.inputContainerError : null,
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={commonStyles.inputStyle}
            onBlur={() => setErrors({ ...errors, name: validateName(name) })}
          />
          {errors.name ? (
            <Text style={commonStyles.errorText}>{errors.name}</Text>
          ) : null}

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

          <Input
            placeholder="Confirm Password"
            leftIcon={
              <View style={commonStyles.iconContainer}>
                <Feather name="lock" size={20} color={colors.textLight} />
              </View>
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textLight}
                />
              </TouchableOpacity>
            }
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword)
                setErrors({ ...errors, confirmPassword: "" });
            }}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            containerStyle={[
              commonStyles.inputContainer,
              errors.confirmPassword ? commonStyles.inputContainerError : null,
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={commonStyles.inputStyle}
            onBlur={() =>
              setErrors({
                ...errors,
                confirmPassword: validateConfirmPassword(confirmPassword),
              })
            }
          />
          {errors.confirmPassword ? (
            <Text style={commonStyles.errorText}>{errors.confirmPassword}</Text>
          ) : null}

          <Button
            title="Create Account"
            testID="signup-submit-btn"
            onPress={handleSignup}
            disabled={loading}
            accessibilityState={{ disabled: loading }}
            loading={loading}
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
              title="Sign up with Google"
              icon={
                <View style={commonStyles.iconContainer}>
                  <AntDesign name="google" size={22} color="#DB4437" />
                </View>
              }
              buttonStyle={commonStyles.socialButton}
              titleStyle={commonStyles.socialButtonTitle}
            />
            <Button
              title="Sign up with Apple"
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
            <Text style={commonStyles.footerText}>
              Already have an account?{" "}
            </Text>
            <Link href="/screens/login">
              <Text style={commonStyles.footerLink}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
