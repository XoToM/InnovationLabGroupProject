import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import {useRouter} from 'expo-router'
import { API_DOMAIN } from '@/constants/config';

export default function PlacesScreen() { //name functions consistently
  const [places, setPlaces] = useState<place[]>([]);
  const [loading, setLoading] = useState(true);
	const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(API_DOMAIN + '/places');
        if (!response.ok){
          throw new Error('Fail to fetch places')
        }
        const data = await response.json();
        setPlaces(data.places);
      } catch (error) {
        console.error(`Error fetching places: ${error}`)
      } finally{
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  type place = {
    idPlace: number;
    name: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
};

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item:place) => item.idPlace.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.card} onPress={() => 
              router.push({
                pathname: '/screens/place',
                params: {
                  name: item.name.toString(),
                    formattedAddress: item.formattedAddress.toString(),
                    latitude: item.latitude,
                    longitude: item.longitude,
                }})}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.formattedAddress}</Text>
            <Text style={styles.coordinates}>{item.latitude}, {item.longitude}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5a3',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#8bc34a',
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#555'
  },
  coordinates: {
    fontSize: 10,
    color: '#336'
  },
});