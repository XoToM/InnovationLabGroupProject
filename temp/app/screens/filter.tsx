import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // State for checkboxes
  const [wheelchairAccess, setWheelchairAccess] = useState(false);
  const [popularity, setPopularity] = useState(false);
  const [ratings, setRatings] = useState(false);
  const [hearingLoop, setHearingLoop] = useState(false);

  // Function to toggle checkbox state
  const toggleCheckbox = (checkbox: string) => {
    switch (checkbox) {
      case 'wheelchairAccess':
        setWheelchairAccess(!wheelchairAccess);
        break;
      case 'popularity':
        setPopularity(!popularity);
        break;
      case 'ratings':
        setRatings(!ratings);
        break;
      case 'hearingLoop':
        setHearingLoop(!hearingLoop);
        break;
      default:
        break;
    }
  };
  const [distance, setDistance] = useState(5); // Default distance (e.g., 5km)

  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={toggleModal} />
      
      {/* Modal - the "box" */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}  // Closing modal on Android back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.xButton} onPress={toggleModal}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <View style={styles.checkboxContainer}>
              {/* Wheelchair Access Checkbox */}
              <TouchableOpacity onPress={() => toggleCheckbox('wheelchairAccess')} style={styles.checkbox}>
                <Text style={styles.checkboxText}>
                  {wheelchairAccess ? '☑' : '☐'} Wheelchair Access
                </Text>
              </TouchableOpacity>

              {/* Popularity Checkbox */}
              <TouchableOpacity onPress={() => toggleCheckbox('popularity')} style={styles.checkbox}>
                <Text style={styles.checkboxText}>
                  {popularity ? '☑' : '☐'} Popularity
                </Text>
              </TouchableOpacity>

              {/* Ratings Checkbox */}
              <TouchableOpacity onPress={() => toggleCheckbox('ratings')} style={styles.checkbox}>
                <Text style={styles.checkboxText}>
                  {ratings ? '☑' : '☐'} Ratings
                </Text>
              </TouchableOpacity>

              {/* Hearing Loop Checkbox */}
              <TouchableOpacity onPress={() => toggleCheckbox('hearingLoop')} style={styles.checkbox}>
                <Text style={styles.checkboxText}>
                  {hearingLoop ? '☑' : '☐'} Hearing Loop
                </Text>
              </TouchableOpacity>
            </View>

            {/* Distance Slider */}
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>Distance: {distance} km</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}  // Minimum distance (1 km)
                maximumValue={50} // Maximum distance (50 km)
                step={1}          // Step for the slider (1 km per step)
                value={distance}
                onValueChange={(value: number) => setDistance(value)}  // Explicitly type value as a number
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1EB1FC"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
  FilterButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,

  }, */
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'left',
  },
  checkboxContainer: {
    marginTop: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  xButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  closeText: {
    fontSize: 20,
    color: 'black',
  },
  distanceContainer: {
    marginTop: 20,
  },
  distanceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  }
});
