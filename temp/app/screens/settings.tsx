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