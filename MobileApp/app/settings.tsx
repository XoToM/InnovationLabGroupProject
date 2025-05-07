import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";

const router = useRouter();
{
  /* коментар */
}

type AccessibilityOptions = {
  "Wheelchair user": boolean;
  "Guide dog owner": boolean;
  "Social anxiety": boolean;
};

const defaultAccessibilityOptions: AccessibilityOptions = {
  "Wheelchair user": false,
  "Guide dog owner": false,
  "Social anxiety": false,
};

const SettingsScreen = () => {
  const [accessibilityOptions, setAccessibilityOptions] =
    useState<AccessibilityOptions>(defaultAccessibilityOptions);
  const { theme, paletteName, setPalette } = useTheme();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedOptions = await AsyncStorage.getItem("accessibilityOptions");
        if (savedOptions) {
          const parsedOptions = JSON.parse(savedOptions);
          const validOptions = { ...defaultAccessibilityOptions };
          Object.keys(defaultAccessibilityOptions).forEach((key) => {
            if (parsedOptions.hasOwnProperty(key)) {
              validOptions[key as keyof AccessibilityOptions] =
                !!parsedOptions[key];
            }
          });
          setAccessibilityOptions(validOptions);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  const toggleOption = async (option: keyof AccessibilityOptions) => {
    setAccessibilityOptions((prev) => {
      const updated = { ...prev, [option]: !prev[option] };
      AsyncStorage.setItem(
        "accessibilityOptions",
        JSON.stringify(updated)
      ).catch((error) => {
        console.error(`Failed to save accessibilityOptions:`, error);
      });
      return updated;
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingIcon}
          onPress={() => router.push("./map")}
        >
          <Ionicons name="home" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.text }]}>Settings</Text>
        <TouchableOpacity
          style={styles.settingIcon}
          onPress={() => router.push("./filter-places")}
        >
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Accessibility Options */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.settingIcon}>
          <Ionicons name="accessibility" size={24} color={theme.text} />
        </TouchableOpacity>
        <View
          style={[styles.optionsContainer, { backgroundColor: theme.card }]}
        >
          {Object.entries(accessibilityOptions).map(([key, value]) => (
            <View key={key} style={styles.optionRow}>
              <Switch
                value={value}
                onValueChange={() =>
                  toggleOption(key as keyof AccessibilityOptions)
                }
              />
              <Text style={[styles.sectionText, { color: theme.text }]}>
                {key}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Color Palette Selector */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.settingIcon}>
          <Ionicons name="color-palette" size={24} color={theme.text} />
        </TouchableOpacity>
        <View
          style={[styles.optionsContainer, { backgroundColor: theme.card }]}
        >
          {(["IBM", "Tol"] as const).map((palette) => (
            <TouchableOpacity
              key={palette}
              style={styles.optionRow}
              onPress={() => setPalette(palette)}
            >
              <Switch
                value={paletteName === palette}
                onValueChange={() => setPalette(palette)}
              />
              <Text style={[styles.sectionText, { color: theme.text }]}>
                {palette} color palette
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
    padding: 20,
    width: "90%",
    alignSelf: "center",
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  settingIcon: {
    margin: 10,
  },
  optionsContainer: {
    padding: 10,
    borderRadius: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default SettingsScreen;
