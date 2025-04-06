import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";



const SettingsScreen = () => {
  {/* коментар */}
  const [accessibilityOptions, setAccessibilityOptions] = useState({ //multiple choice option
    "Wheelchair user": false,
    "Hearing loop": false,
    "Guide dog owner": false,
    "Social anxiety": false,
  });

  const [selectedPalette, setSelectedPalette] = useState("IBM"); //current palette and a function to set it (IBM - default choice)

  const toggleOption = (option: keyof typeof accessibilityOptions) => {
    setAccessibilityOptions((previous) => {
      const newState = { ...previous }; //saves the previous state
      newState[option] = !previous[option]; //new is the opposite of previous 
      return newState;
    });
  };

  return (
    
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