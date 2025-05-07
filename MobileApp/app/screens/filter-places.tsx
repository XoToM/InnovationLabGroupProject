import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView, Button, Image
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Hardcoded user location replceable by user inputted variable
const USER_LOCATION = {
  latitude: 51.3781,  // Example: Bath coordinates
  longitude: -2.3597,
};

type Place = {
  distance: number;
  longitude: number;
  latitude: number;
  idPlace: number;
  name: string;
  formattedAddress: string;
  photo: string;
  wheelchairAccessibleParking: number;
  wheelchairAccessibleEntrance: number;
  wheelchairAccessibleRestroom: number;
  wheelchairAccessDescription: number;
  description: string;
  rating: number;
  priceLevel: number;
  nationalPhoneNumber: string;
  regularOpeningHours: string;
  delivery: number;
  takeout: number;
  dineIn: number;
  outdoorSeating: number;
  liveMusic: number;
  allowsDogs: number;
  goodForChildren: number;
  goodForGroups: number;
  goodForWatchingSports: number;
  restroom: number;
  reservable: number;
  curbsidePickup: number;
  menuForChildren: number;
  acceptsCreditCards: number;
  acceptsDebitCards: number;
  acceptsCashOnly: number;
  acceptsNfc: number;
  
};

// Filter types
type FilterKey = 'wheelchairAccessibleEntrance' | 'wheelchairAccessibleParking' | 'wheelchairAccessibleRestroom' | 'allowsDogs' | 'ratings' | 'inductionLoop' | 'goodForChildren' | 'delivery' | 'takeout' | 'reservable' | 'acceptsNfc' | 'acceptsCashOnly';
type Filters = Record<FilterKey, boolean>;

// Distance calculation function
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance < 1 
    ? `${Math.round(distance * 1000)}m` 
    : `${distance.toFixed(1)}km`;
}

export default function PlacesScreen() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // State of filter by default
  const [filters, setFilters] = useState<Filters>({
    wheelchairAccessibleEntrance: false,
    wheelchairAccessibleParking: false,
    wheelchairAccessibleRestroom: false,
    allowsDogs: false,
    ratings: false,
    inductionLoop: false,
    goodForChildren: false,
    delivery: false,
    takeout: false,
    reservable: false,
    acceptsNfc: false,
    acceptsCashOnly: false
  });
   
  // Search key and displayed name
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'wheelchairAccessibleEntrance', label: 'Wheelchair Access Entrance' },
    { key: 'wheelchairAccessibleParking', label: 'Wheelchair Parking' },
    { key: 'wheelchairAccessibleRestroom', label: 'Wheelchair Access Restroom' },
    { key: 'allowsDogs', label: 'Dogs Allowed' },
    { key: 'ratings', label: 'Highly Rated' },
    { key: 'inductionLoop', label: 'Hearing Loop' },
    { key: 'goodForChildren', label: 'Child Friendly' },
    { key: 'delivery', label: 'Has delivery'},
    { key: 'takeout', label: 'Has takeout'},
    { key: 'reservable', label: 'Takes Reservations'},
    { key: 'acceptsNfc', label: 'Contactless Payment'},
    { key: 'acceptsCashOnly', label: 'Cash Payment'}
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
    
    //for debugging, outputs data into console
    try {
      setLoading(true);
      console.log('====== FETCHING DATA ======');
      console.log('Request URL:', url);
      console.log('Active filters:', appliedFilters);
      console.log('Query string:', queryString);
      
      const response = await fetch(url);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch places: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Raw response data:', data);
      
      // Add distance to each place
      const placesWithDistance = data.places.map((place: Place) => {
        const distance = calculateDistance(
          USER_LOCATION.latitude,
          USER_LOCATION.longitude,
          place.latitude,
          place.longitude
        );
        
        console.log(`Calculated distance for ${place.name}:`, distance);
        
        return {
          ...place,
          distance
        };
      });
      
      console.log('Processed places with distances:', placesWithDistance);
      setPlaces(placesWithDistance);
      
    } catch (err) {
      console.error('❌ FETCH ERROR:', err);
    } finally {
      setLoading(false);
      console.log('====== FETCH COMPLETED ======');
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching initial data');
    fetchPlaces();
  }, []);

  const toggleFilter = async (key: FilterKey) => {
    console.log(`Toggling filter ${key} from ${filters[key]} to ${!filters[key]}`);
    const newValue = !filters[key];
    const updatedFilters = { ...filters, [key]: newValue };
    setFilters(updatedFilters);
    await fetchPlaces(updatedFilters);
  };

  const toggleModal = () => {
    console.log(`Filter modal visibility changed to ${!isModalVisible}`);
    setIsModalVisible(!isModalVisible);
  };

  if (loading) {
    console.log('Rendering loading state');
    return (
      <View style={styles.screenContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  //shows how many itmes fetched, helps with filter assessment
  console.log('Rendering places list with', places.length, 'items');
  return (
    <View style={styles.screenContainer}>
      {/* Header with aligned icons and filter button */}
      <View style={styles.headerContainer}>
        <Link href="/screens/menu" style={styles.iconButton}>
          <TouchableOpacity>
            <Ionicons name="menu" size={36} color="#284e1a" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={toggleModal} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>

        <Link href="/screens/settings" style={styles.iconButton}>
          <TouchableOpacity>
            <Ionicons name="settings" size={36} color="#284e1a" />
          </TouchableOpacity>
        </Link>
      </View>

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
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.idPlace.toString()}
        numColumns={1}
        renderItem={({ item }) => (
          
          
          
            <TouchableOpacity style={styles.card}
            onPress={() => router.push( 
              {
                  pathname: '/screens/place',
                  params: item
                })}
            >
            {item.photo && (
              <Image 
                source={{ uri: item.photo }} 
                style={styles.cardImage}
                resizeMode="cover"
               />
            )}
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.formattedAddress}</Text>
              <Text style={styles.distanceText}>{item.distance} away</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5a3', 
    maxWidth: 720,
    maxHeight: 1280 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#284e1a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 15
  },
  listContentContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#8bc34a',
    width: '100%',
    marginVertical: 12,
    padding: 15,
    borderRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subTitle: { 
    fontSize: 14, 
    color: '#555',
    textAlign: 'center'
  },
  distanceText: { 
    fontSize: 12, 
    color: '#336',
    marginTop: 5,
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    width: 400, 
    maxHeight: 700,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  xButton: {
    position: 'absolute', 
    top: 10, 
    right: 10,
    padding: 5, 
    backgroundColor: 'lightgray', 
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { 
    fontSize: 16, 
    color: 'black',
    fontWeight: 'bold'
  },
  checkboxContainer: { 
    marginTop: 20, 
    maxHeight: 400, 
  },
  checkbox: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  checkboxText: { 
    fontSize: 30,
    marginLeft: 10,
    flexWrap: 'nowrap'
  },
});