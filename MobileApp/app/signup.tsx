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
import { useAuth } from "../context/context";
import { colors, commonStyles } from "../common/common";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

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
        Alert.alert("Success", "Account created successfully!");
        router.replace("/login");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  }

  const inputStyles = (hasError: boolean) => [
    commonStyles.inputContainer,
    {
      backgroundColor: "#99cc66",
      borderColor: hasError ? "#ef4444" : "transparent",
      borderWidth: hasError ? 1.5 : 0,
    },
  ];

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
          Create Account
        </Text>
        <Text style={[commonStyles.subtitle, { color: "#333" }]}>
          Sign up to get started with all our features
        </Text>

        <View style={commonStyles.formContainer}>
          <Input
            placeholder="Full Name"
            placeholderTextColor="#ffffffcc"
            leftIcon={<Feather name="user" size={20} color="#fff" />}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            value={name}
            autoCapitalize="words"
            containerStyle={inputStyles(!!errors.name)}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#99cc66",
            }}
            inputStyle={{ color: "#fff" }}
            onBlur={() => setErrors({ ...errors, name: validateName(name) })}
          />
          {errors.name ? (
            <Text style={commonStyles.errorText}>{errors.name}</Text>
          ) : null}

          <Input
            placeholder="Email"
            placeholderTextColor="#ffffffcc"
            leftIcon={<Feather name="mail" size={20} color="#fff" />}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={inputStyles(!!errors.email)}
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
            leftIcon={<Feather name="lock" size={20} color="#fff" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
            containerStyle={inputStyles(!!errors.password)}
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

          <Input
            placeholder="Confirm Password"
            placeholderTextColor="#ffffffcc"
            leftIcon={<Feather name="lock" size={20} color="#fff" />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#fff"
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
            containerStyle={inputStyles(!!errors.confirmPassword)}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#99cc66",
            }}
            inputStyle={{ color: "#fff" }}
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
            onPress={handleSignup}
            disabled={loading}
            loading={loading}
            buttonStyle={{
              backgroundColor: "#ffcc00",
              borderRadius: 12,
              height: 56,
              marginTop: 16,
            }}
            titleStyle={{ color: "#000", fontWeight: "600" }}
            disabledStyle={{ backgroundColor: "#ffcc00aa" }}
          />

          <View style={commonStyles.footerContainer}>
            <Text style={[commonStyles.footerText, { color: "#333" }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/login">
              <Text style={[commonStyles.footerLink, { color: "#000" }]}>
                Sign In
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}