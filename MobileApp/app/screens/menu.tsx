import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScreensMenu() {
  return (
    <View style={styles.container}>
      {/* Settings cog icon in top right */}
      <Link href="/screens/settings" style={styles.settingsButton}>
        <TouchableOpacity>
          <Ionicons name="settings" size={60} color="#284e1a" />
        </TouchableOpacity>
      </Link>

      {/* Vertical button list */}
      <View style={styles.buttonContainer}>
        <Link href="/screens/login" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </Link>
        <Link href="/screens/signup" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </View>
        </Link>
        <Link href="/screens/map" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </View>
        </Link>
        <Link href="/screens/place" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Place</Text>
          </View>
        </Link>
        <Link href="/screens/filter-places" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Filter</Text>
          </View>
        </Link>
        <Link href="/screens/places" style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Places</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5a3',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    zIndex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, // Added horizontal padding
    gap: 24, // Increased gap between buttons
  },
  link: {
    width: '80%', // Buttons will take up 80% of container width
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#284e1a',
    paddingVertical: 20, // Increased vertical padding
    paddingHorizontal: 24,
    borderRadius: 12, // Slightly larger border radius
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Buttons will fill their container
  },
  buttonText: {
    color: 'white',
    fontSize: 30, // Larger font size
    fontWeight: 'bold',
  },
});