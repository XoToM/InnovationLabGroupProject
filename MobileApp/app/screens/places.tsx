import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import {Link} from 'expo-router'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export default function PlacesScreen() { //name functions consistently
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => { //limit number of places (pagination)
      try{
        const response = await fetch('https://katestudent.pythonanywhere.com/places');
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
    idPlace: Number;
    name: String;
    address: String;
    latitude: Float;
    longitude: Float;
};

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item:place) => item.idPlace.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/screens/place',
              params: {
                name: item.name.toString(),
                address: item.address.toString(),
                latitude: item.latitude,
                longitude: item.longitude,
              },
            }}
          >
            <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.address}</Text>
            <Text style={styles.coordinates}>{item.latitude}, {item.longitude}</Text>
            </TouchableOpacity>
          </Link>
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

