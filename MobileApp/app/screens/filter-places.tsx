import React, { useState, useEffect } from 'react';
import { FlatList, Modal, ScrollView, Image, View } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { BackgroundView, CardView } from '@/components/views';
import { TextBtn, Toggle } from '@/components/interactive';
import { Title, H2, P } from '@/components/text';
import { useTheme } from '@/context/ThemeContext';

const USER_LOCATION = {
  latitude: 51.3781,
  longitude: -2.3597,
};

type Place = {
  distance: string;
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

type FilterKey =
  | 'wheelchairAccessibleEntrance'
  | 'wheelchairAccessibleParking'
  | 'wheelchairAccessibleRestroom'
  | 'allowsDogs'
  | 'ratings'
  | 'inductionLoop'
  | 'goodForChildren'
  | 'delivery'
  | 'takeout'
  | 'reservable'
  | 'acceptsNfc'
  | 'acceptsCashOnly';

type Filters = Record<FilterKey, boolean>;

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
}

export default function PlacesScreen() {
  const { theme } = useTheme();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    acceptsCashOnly: false,
  });

  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'wheelchairAccessibleEntrance', label: 'Wheelchair Access Entrance' },
    { key: 'wheelchairAccessibleParking', label: 'Wheelchair Parking' },
    { key: 'wheelchairAccessibleRestroom', label: 'Wheelchair Access Restroom' },
    { key: 'allowsDogs', label: 'Dogs Allowed' },
    { key: 'ratings', label: 'Highly Rated' },
    { key: 'inductionLoop', label: 'Hearing Loop' },
    { key: 'goodForChildren', label: 'Child Friendly' },
    { key: 'delivery', label: 'Has delivery' },
    { key: 'takeout', label: 'Has takeout' },
    { key: 'reservable', label: 'Takes Reservations' },
    { key: 'acceptsNfc', label: 'Contactless Payment' },
    { key: 'acceptsCashOnly', label: 'Cash Payment' },
  ];

  const fetchPlaces = async (appliedFilters = filters) => {
    const activeFilters = Object.entries(appliedFilters)
      .filter(([key, value]) => key !== 'ratings' && value)
      .map(([key]) => `${key}=1`);

    if (appliedFilters.ratings) {
      activeFilters.push('rating=4');
      activeFilters.push('rating=4.5');
      activeFilters.push('rating=5');
    }

    const queryString = activeFilters.length ? `?${activeFilters.join('&')}` : '';
    const url = `https://katestudent.pythonanywhere.com:443/places${queryString}`;

    try {
      setLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch places: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const placesWithDistance = data.places.map((place: Place) => {
        const distance = calculateDistance(
          USER_LOCATION.latitude,
          USER_LOCATION.longitude,
          place.latitude,
          place.longitude
        );
        return {
          ...place,
          distance,
        };
      });

      setPlaces(placesWithDistance);
    } catch (err) {
      console.error('❌ FETCH ERROR:', err);
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  if (loading) {
    return (
      <BackgroundView style={{ justifyContent: 'center', alignItems: 'center' }}>
        <P>Loading...</P>
      </BackgroundView>
    );
  }

  return (
    <BackgroundView>
      <CardView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <Link href="/screens/menu">
          <TextBtn icon="menu" iconSize={36} onClick={() => {}} />
        </Link>

        <TextBtn onClick={toggleModal} style={{ paddingHorizontal: 24 }}>
          Filters
        </TextBtn>

        <Link href="/screens/settings">
          <TextBtn icon="settings" iconSize={36} onClick={() => {}} />
        </Link>
      </CardView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <CardView style={{ width: '80%', maxHeight: '70%', padding: 24 }}>
            <TextBtn
              onClick={toggleModal}
              style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, padding: 0 }}
              textStyle={{ fontSize: 16, fontWeight: 'bold' }}
            >
              X
            </TextBtn>

            <Title style={{ marginBottom: 16 }}>Filters</Title>

            <ScrollView style={{ maxHeight: '80%' }}>
              {filterOptions.map(({ key, label }) => (
                <Toggle key={key} label={label} value={filters[key]} onChange={() => toggleFilter(key)} />
              ))}
            </ScrollView>
          </CardView>
        </View>
      </Modal>

      <FlatList
        data={places}
        style={{ width: '100%', paddingHorizontal: 15 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyExtractor={(item) => item.idPlace.toString()}
        numColumns={1}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/screens/place',
              params: {
                name: item.name,
                formattedAddress: item.formattedAddress,
                latitude: item.latitude,
                longitude: item.longitude,
                image: item.photo,
              },
            }}
            asChild
          >
            <View style={{ marginVertical: 12 }}>
              <CardView style={{ width: '100%', padding: 15 }}>
                {item.photo && (
                  <Image
                    source={{ uri: item.photo }}
                    style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 10 }}
                    resizeMode="cover"
                  />
                )}
                <H2 style={{ textAlign: 'center' }}>{item.name}</H2>
                <P style={{ textAlign: 'center' }}>{item.formattedAddress}</P>
                <P style={{ textAlign: 'center', marginTop: 5 }}>
                  {`${item.distance} away`}
                </P>
              </CardView>
            </View>
          </Link>
        )}
      />
    </BackgroundView>
  );
}
