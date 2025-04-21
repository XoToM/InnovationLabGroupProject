"use client";

import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define user type
type User = {
  id: string;
  email: string;
  name: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in a real app, this would be your backend)
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "Demo User",
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("@auth_user");
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { error: "Invalid email or password" };
      }

      // Create user object without password
      const userToStore: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };

      // Store user in state and AsyncStorage
      setUser(userToStore);
      await AsyncStorage.setItem("@auth_user", JSON.stringify(userToStore));

      return {};
    } catch (error) {
      console.error("Sign in error", error);
      return { error: "An unexpected error occurred" };
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    try {
      // Check if user already exists
      const userExists = MOCK_USERS.some((u) => u.email === email);

      if (userExists) {
        return { error: "User with this email already exists" };
      }

      // In a real app, this would create a user in your database
      // For this mock version, we'll just pretend it worked

      // You could add the user to MOCK_USERS here if you want to test signing in
      // with the newly created account

      return {};
    } catch (error) {
      console.error("Sign up error", error);
      return { error: "An unexpected error occurred" };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clear user from state and AsyncStorage
      setUser(null);
      await AsyncStorage.removeItem("@auth_user");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { AuthContext };
