import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView, Button
} from 'react-native';
import { Link } from 'expo-router';

type Place = {
  idPlace: number;
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
};

//filter types
type FilterKey = 'wheelchairAccessibleEntrance' | 'allowsDogs' | 'ratings' | 'inductionLoop' | 'goodForChildren';
type Filters = Record<FilterKey, boolean>;

export default function PlacesScreen() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //state of filter by default
  const [filters, setFilters] = useState<Filters>({
    wheelchairAccessibleEntrance: false,
    allowsDogs: false,
    ratings: false,
    inductionLoop: false,
    goodForChildren: false,
  });
   
  //search key and displayed name
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'wheelchairAccessibleEntrance', label: 'Wheelchair Access' },
    { key: 'allowsDogs', label: 'Dogs Allowed' },
    { key: 'ratings', label: 'Highly Rated' },
    { key: 'inductionLoop', label: 'Hearing Loop' },
    { key: 'goodForChildren', label: 'Child Friendly' }
  ];

  const fetchPlaces = async (appliedFilters = filters) => {
    const activeFilters = Object.entries(appliedFilters)
      .filter(([key, value]) => key !== 'ratings' && value)
      .map(([key]) => `${key}=1`);

    if (appliedFilters.ratings) {
      // Add 4, 4.5, and 5 ratings explicitly in search
      activeFilters.push('rating=4');
      activeFilters.push('rating=4.5');
      activeFilters.push('rating=5');
    }

    const queryString = activeFilters.length ? `?${activeFilters.join('&')}` : '';
    const url = `https://katestudent.pythonanywhere.com:443/places${queryString}`;
    
    //debug console messages
    try {
      setLoading(true);
      console.log('Fetching:', url);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch places: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setPlaces(data.places);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const toggleFilter = async (key: FilterKey) => {
    const newValue = !filters[key];
    const updatedFilters = { ...filters, [key]: newValue };
    setFilters(updatedFilters);
    await fetchPlaces(updatedFilters);
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

      <FlatList
        data={places}
        keyExtractor={(item) => item.idPlace.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/screens/place',
              params: {
                name: item.name,
                formattedAddress: item.formattedAddress,
                latitude: item.latitude,
                longitude: item.longitude,
              },
            }}
          >
            <TouchableOpacity style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.formattedAddress}</Text>
              <Text style={styles.coordinates}>
                {item.latitude}, {item.longitude}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5a3', alignItems: 'center' },
  card: {
    backgroundColor: '#8bc34a',
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subTitle: { fontSize: 14, color: '#555' },
  coordinates: { fontSize: 10, color: '#336' },

  // Modal Styles
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    width: 300, maxHeight: 500,
    padding: 20, backgroundColor: 'white', borderRadius: 10,
  },
  xButton: {
    position: 'absolute', top: 10, right: 10,
    padding: 5, backgroundColor: 'lightgray', borderRadius: 50,
  },
  closeText: { fontSize: 20, color: 'black' },
  checkboxContainer: { marginTop: 20, maxHeight: 200 },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkboxText: { fontSize: 16 },
});
