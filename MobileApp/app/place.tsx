import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const [activeInfo, setActiveInfo] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { name, formattedAddress, latitude, longitude } =
    useLocalSearchParams(); //add additional parametrs

  const toggleInfo = (type: any) => {
    setActiveInfo(activeInfo === type ? null : type);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>EquiMap</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>{name}</Text>

      {/* Large Image */}
      <Image
        source={require("../assets/images/better-icon.png")}
        style={[styles.largeImage, { resizeMode: "stretch" }]}
      />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {[
          { type: "accessibility", label: "♿" },
          { type: "lgbt", label: "🏳️‍🌈" },
          { type: "custom1", label: "🔍" }, // Placeholder
          { type: "custom2", label: "🍽️" }, // Placeholder
        ].map(({ type, label }) => (
          <View key={type} style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => toggleInfo(type)}
            >
              <Text style={styles.iconText}>{label}</Text>
            </TouchableOpacity>
            {activeInfo === type && <Text style={styles.arrow}>▲</Text>}
          </View>
        ))}
      </View>

      {/* Info Box */}
      {activeInfo && (
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            {activeInfo === "accessibility"
              ? "This location has great disability access."
              : activeInfo === "lgbt"
              ? "This location supports LGBTQ+ inclusivity."
              : "Placeholder text for new button."}
          </Text>
        </View>
      )}

      {/* Rating & Pricing */}
      <View style={styles.ratingContainer}>
        <Text style={styles.stars}>⭐⭐⭐⭐☆</Text>
        <Text style={styles.price}>££</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuTray}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeText}>✖ Close</Text>
            </TouchableOpacity>
            {/* Add menu content here */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5a3",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#8BC34A",
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pageTitle: {
    backgroundColor: "#c5da8c",
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  largeImage: {
    width: "90%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 50,
    elevation: 3,
  },
  iconText: {
    fontSize: 20,
  },
  arrow: {
    fontSize: 20,
    marginTop: 5,
  },
  noticeBox: {
    backgroundColor: "#f4a261",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  noticeText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
  },
  stars: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    justifyContent: "center",
    alignItems: "center",
  },
  menuTray: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
});
