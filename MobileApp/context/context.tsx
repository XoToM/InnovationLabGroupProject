"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../utils/supabase"; // Ensure this path matches your project structure

type User = {
  id: string;
  email: string;
};

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const supaUser = data.session.user;
        setUser({ id: supaUser.id, email: supaUser.email! });
        await AsyncStorage.setItem("@auth_user", JSON.stringify(supaUser));
      }
      setLoading(false);
    };
    getSession();
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // optional: custom user metadata
        },
      });

      console.log("SIGNUP DEBUG:", { data, error });

      if (error) return { error: error.message };
      return {};
    } catch (error) {
      console.error("Sign up error", error);
      return { error: "An unexpected error occurred" };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };
    if (data.user) {
      setUser({ id: data.user.id, email: data.user.email! });
      await AsyncStorage.setItem("@auth_user", JSON.stringify(data.user));
    }

    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem("@auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
