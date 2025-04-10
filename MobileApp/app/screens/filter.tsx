import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


export default function filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distance, setDistance] = useState(20);

  // ✅ Filter types
  type FilterKey = 'wheelchairAccess' | 'popularity' | 'ratings' | 'hearingLoop';
  type Filters = Record<FilterKey, boolean>;

  const [filters, setFilters] = useState<Filters>({
    wheelchairAccess: false,
    popularity: false,
    ratings: false,
    hearingLoop: false,
  });

  // 🔁 Filter options
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'wheelchairAccess', label: 'Wheelchair Access' },
    { key: 'popularity', label: 'Popularity' },
    { key: 'ratings', label: 'Ratings' },
    { key: 'hearingLoop', label: 'Hearing Loop' },
  ];

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // 🛰️ Toggle filter and fetch data
  const toggleFilter = async (key: FilterKey) => {
    const newValue = !filters[key];
    const updatedFilters = { ...filters, [key]: newValue };
    setFilters(updatedFilters);

    const activeFilters = Object.entries(updatedFilters)
      .filter(([_, value]) => value)
      .map(([filterKey]) => `${filterKey}=true`)
      .join('&');

    const queryString = `${activeFilters}&distance=${distance}`;

    try {
      const response = await fetch(`https://katestudent.pythonanywhere.com:443/places${queryString}`, { //before query string put api endpoint link
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();

      // ✅ Print to Metro terminal
      console.log('Fetched Locations:', data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={toggleModal} />

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.xButton} onPress={toggleModal}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <ScrollView style={styles.checkboxContainer}>
              {filterOptions.map(({ key, label }) => (
                <TouchableOpacity key={key} onPress={() => toggleFilter(key)} style={styles.checkbox}>
                  <Text style={styles.checkboxText}>
                    {filters[key] ? '☑' : '☐'} {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>Distance: {distance} km</Text>
              {/*<Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={distance}
                onValueChange={(value: number) => setDistance(value)}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1EB1FC"
              />*/}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 💄 Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    width: 300,
    maxHeight: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  xButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  closeText: { fontSize: 20, color: 'black' },
  checkboxContainer: {
    marginTop: 20,
    maxHeight: 200,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: { fontSize: 16 },
  distanceContainer: { marginTop: 20 },
  distanceText: { fontSize: 16, marginBottom: 10 },
  slider: { width: '100%' },
});
