import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AccessibilityOptions = {
  "Wheelchair user": boolean;
  "Guide dog owner": boolean;
  "Social anxiety": boolean;
};

const SettingsScreen = () => {
  {/* коментар */}
  const defaultAccessibilityOptions: AccessibilityOptions = {
    "Wheelchair user": false,
    "Guide dog owner": false,
    "Social anxiety": false,
  };
  const [accessibilityOptions, setAccessibilityOptions] = useState<AccessibilityOptions>(defaultAccessibilityOptions);

  const [selectedPalette, setSelectedPalette] = useState("IBM"); //current palette and a function to set it (IBM - default choice)

  useEffect(() => { 
    const loadSettings = async () => { //it loads the settings if they're saved
      try {
        const savedPalette = await AsyncStorage.getItem("selectedPalette");
        if (savedPalette) {
          setSelectedPalette(savedPalette);
        }

        const savedOptions = await AsyncStorage.getItem("accessibilityOptions");
        if (savedOptions) {
          const parsedOptions = JSON.parse(savedOptions);
          const validOptions = { ...defaultAccessibilityOptions };
          Object.keys(defaultAccessibilityOptions).forEach((key) => {
            if (parsedOptions.hasOwnProperty(key)) {
              validOptions[key as keyof AccessibilityOptions] = !!parsedOptions[key];
            }
          });
          setAccessibilityOptions(validOptions);
        }
      } catch (error) {
        console.error("Failed to load settings from storage:", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => { //saves the palette
    const savePalette = async () => {
      try {
        await AsyncStorage.setItem("selectedPalette", selectedPalette);
      } catch (error) {
        console.error("Failed to save palette to storage:", error);
      }
    };
    savePalette();
  }, [selectedPalette]);

  const toggleOption = async (option: keyof AccessibilityOptions) => {
    setAccessibilityOptions((previous) => {
      const newState = { ...previous, [option]: !previous[option] };
      AsyncStorage.setItem("accessibilityOptions", JSON.stringify(newState)).catch((error) => { //saves it immediately
        console.error(`Failed to save accessibilityOptions for ${option}:`, error);
      });
      return newState;
    });
  };

  return (
    <ScrollView style={styles.container}> {/* the whole screen is scrollable */}
      <View style={styles.header}> {/* header */}
        <TouchableOpacity style={styles.settingIcon}> {/* button with an icon. later should be linked to other pages */}
          <Ionicons name="home" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <TouchableOpacity style={styles.settingIcon}>
          <Ionicons name="close" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}> {/* view for first options regarding accessabilities */}
        <TouchableOpacity style={styles.settingIcon}>
          <Ionicons name="filter" size={24} /> {/* another icon */}
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {Object.entries(accessibilityOptions).map(([key, value]) => ( /* this runs through every accessibility option */
            <View key={key} style={styles.optionRow}> {/* creates switch for every option */}
              <Switch value={value} onValueChange={() => toggleOption(key as keyof typeof accessibilityOptions)} />
              <Text style = {styles.sectionText}>{key}</Text> 
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingIcon}>
          <Ionicons name="color-palette" size={24} />
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {["Tol", "IBM"].map((palette) => ( /* out of two options listed run through them */
            <TouchableOpacity key={palette} style={styles.optionRow} onPress={() => setSelectedPalette(palette)}>
              <Switch value={selectedPalette === palette} onValueChange={() => setSelectedPalette(palette)} />
              <Text style = {styles.sectionText}>{palette} color palette</Text>
            </TouchableOpacity> //!!!in future it will use Async storage to save chosen settings!!!
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
    backgroundColor: "white",
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
    marginBottom: 5,
    padding: 20,
    width: "90%",
  },
  sectionText: {
    marginLeft: 10,
  },
  settingIcon: {
    margin: 10,
  },
  optionsContainer: {
    backgroundColor: "#f0f0f0",
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