import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ✅ Filter types
  type FilterKey = 'wheelchairAccessibleEntrance' | 'allowsDogs' | 'ratings' | 'inductionLoop';
  type Filters = Record<FilterKey, boolean>;

  const [filters, setFilters] = useState<Filters>({
    wheelchairAccessibleEntrance: false,
    allowsDogs: false,
    ratings: false,
    inductionLoop: false,
  });

  // 🔁 Filter options
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'wheelchairAccessibleEntrance' , label: 'Wheelchair Access' },
    { key: 'allowsDogs', label: 'Dogs Allowed' },
    { key: 'ratings', label: 'Ratings' },
    { key: 'inductionLoop', label: 'Hearing Loop' },
  ];

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // 🛰️ Toggle filter and fetch data
  const toggleFilter = async (key: FilterKey) => {
    const newValue = !filters[key];
    const updatedFilters = { ...filters, [key]: newValue };
    setFilters(updatedFilters);
  
    const activeFilters = Object.entries(updatedFilters)
      .filter(([_, value]) => value)
      .map(([filterKey]) => `${filterKey}=1`)
      .join('&');
  
    const queryString = activeFilters ? `?${activeFilters}` : '';
  
    try {
      const url = `https://katestudent.pythonanywhere.com:443/places${queryString}`;
      console.log('📡 Fetching with URL:', url); // 👈 debug print to see if api call is right
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // below for debugging 
      if (!response.ok) throw new Error('API request failed');
  
      const data = await response.json();
      console.log('✅ Fetched Locations:', data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
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
});
