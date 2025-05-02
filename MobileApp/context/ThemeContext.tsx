import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your palettes
const palettes = {
  IBM: {
    background: "#648FFF",
    text: "#000000",
    primary: "#FE6100",
    card: "#FFFFFF",
    icon: "#FFB000",
    accent: "#DC267F",
  },
  Tol: {
    background: "#88CCEE",
    text: "#000000",
    primary: "#999933",
    card: "#AA4499",
    icon: "#DDCC77",
    accent: "#882255",
  },
};

type PaletteName = keyof typeof palettes;
type Theme = typeof palettes[PaletteName];

type ThemeContextType = {
  theme: Theme;
  paletteName: PaletteName;
  setPalette: (name: PaletteName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [paletteName, setPaletteName] = useState<PaletteName>("IBM");

  useEffect(() => {
    const loadPalette = async () => {
      const saved = await AsyncStorage.getItem("selectedPalette");
      if (saved && saved in palettes) {
        setPaletteName(saved as PaletteName);
      }
    };
    loadPalette();
  }, []);

  const setPalette = async (name: PaletteName) => {
    setPaletteName(name);
    await AsyncStorage.setItem("selectedPalette", name);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: palettes[paletteName],
        paletteName,
        setPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
