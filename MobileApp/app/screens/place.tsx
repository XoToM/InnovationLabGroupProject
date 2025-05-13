import { H1, H2, H3, P } from '@/components/text';
import { BackgroundView, CardView } from '@/components/views';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
export default function App() {
  const theme = useTheme();
  const safeAreaPadding = useSafeAreaInsets();
  const [activeInfo, setActiveInfo] = useState(null);
  const [hoursOpen, setHoursOpen] = useState(false);
  const { idPlace, name, formattedAddress, photo, wheelchairAccessibleParking, wheelchairAccessibleEntrance, wheelchairAccessibleRestroom, wheelchairAccessDescription, inductionLoop, inductionLoopDescription, description, rating, priceLevel, nationalPhoneNumber, latitude, longitude, regularOpeningHours, delivery, takeout, dineIn, outdoorSeating, liveMusic, allowsDogs, goodForChildren, goodForGroups, goodForWatchingSports, restroom, reservable, curbsidePickup, menuForChildren, acceptsCreditCards, acceptsDebitCards, acceptsCashOnly, acceptsNfc } = useLocalSearchParams(); //add additional parameters


  const toggleInfo = (type: any) => {
    setActiveInfo(activeInfo === type ? null : type);
  };

  const renderStars = (rating: any) => {
    const fullStars = Math.floor(Number(rating));
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const renderPriceLevel = (priceLevel: string) => {
    const map: { [key: string]: string } = {
      PRICE_LEVEL_INEXPENSIVE: '£',
      PRICE_LEVEL_MODERATE: '££',
      PRICE_LEVEL_VERY_EXPENSIVE: '£££',
    };
    return map[priceLevel] || '???'; // Default to unknown if not found
  };

  return (
        // <SafeAreaView edges={["bottom"]}>
    <BackgroundView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={[styles.scrollContent,{paddingBottom:safeAreaPadding.bottom+10}]}> {/*you need scroll view to scroll but then you need background to make it look good. thats why its nested like this freaky deaky ass shit*/}

          {photo ? (
            <Image source={{ uri: String(photo) }} style={[styles.largeImage, { resizeMode: "stretch" }]} />
          ) : (
            <P>No image available</P>
          )}
          <View style={{width:"90%", flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

          <View style={[styles.buttonContainer,{marginBottom:0}]}>
            {[
              { type: 'accessibility', label: ' ♿ ' },
              { type: 'familyPets', label: ' 🐶 ' },
              { type: 'services', label: ' 🍽️ ' },
              { type: 'payment', label: ' 💳 ' },
            ].map(({ type, label }) => (

              <CardView key={type} style={[styles.buttonWrapper,(activeInfo===type)?{paddingBottom:0, borderBottomWidth:0}:{}]}>
                <TouchableOpacity style={styles.iconButton} onPress={() => toggleInfo(type)}>
                  <P style={styles.iconText}>{String(label)}</P>
                </TouchableOpacity>
                {activeInfo === type && <P>▲</P>}
              </CardView>
            ))}
          </View>


          
          {activeInfo&&(<CardView style={[styles.noticeBox,{maxHeight:activeInfo?"auto":0}]}>
              {activeInfo === 'accessibility' && (
                <>
                  <P>
                    {Number(wheelchairAccessibleEntrance) === 1 ? '✅ Accessible Entrance ✅' : '❌ No Accessible Entrance ❌'}
                  </P>
                  <P>
                    {Number(wheelchairAccessibleParking) === 1 ? '✅ Accessible Parking ✅' : '❌ No Accessible Parking ❌'}
                  </P>
                  <P>
                    {Number(wheelchairAccessibleRestroom) === 1 ? '✅ Accessible Restroom ✅' : '❌ No Accessible Restroom ❌'}
                  </P>
                </> // wheelchair access description not even used at all in database and it was giving me a headache
              )}


              {activeInfo === 'familyPets' && (
                <>
                  <P>
                    {Number(goodForChildren) === 1 ? '✅ Good for Children ✅' : '❌ Not Suitable for Children ❌'}
                  </P>
                  <P>
                    {Number(menuForChildren) === 1 ? '✅ Kids Menu Available ✅' : '❌ No Kids Menu ❌'}
                  </P>
                  <P>
                    {Number(restroom) === 1 ? '✅ Restroom Available ✅' : '❌ No Restroom ❌'}
                  </P>
                  <P>
                    {Number(goodForGroups) === 1 ? '✅ Good for Groups ✅' : '❌ Not Suitable for Groups ❌'}
                  </P>
                  <P>
                    {Number(allowsDogs) === 1 ? '✅ Dogs Allowed ✅' : '❌ No Dogs Allowed ❌'}
                  </P>
                </>
              )}


              {activeInfo === 'services' && (
                <>
                  <P>
                    {Number(delivery) === 1 ? '✅ Delivery Available ✅' : '❌ No Delivery ❌'}
                  </P>
                  <P>
                    {Number(takeout) === 1 ? '✅ Takeout Available ✅' : '❌ No Takeout ❌'}
                  </P>
                  <P>
                    {Number(dineIn) === 1 ? '✅ Dine-In Option ✅' : '❌ No Dine-In Option ❌'}
                  </P>
                  <P>
                    {Number(curbsidePickup) === 1 ? '✅ Curbside Pickup ✅' : '❌ No Curbside Pickup ❌'}
                  </P>
                  <P>
                    {Number(outdoorSeating) === 1 ? '✅ Outdoor Seating ✅' : '❌ No Outdoor Seating ❌'}
                  </P>
                  <P>
                    {Number(liveMusic) === 1 ? '✅ Live Music ✅' : '❌ No Live Music ❌'}
                  </P>
                  <P>
                    {Number(goodForWatchingSports) === 1 ? '✅ Good for Watching Sports ✅' : '❌ Not Suitable for Watching Sports ❌'}
                  </P>
                  <P>
                    {Number(reservable) === 1 ? '✅ Can Be Reserved ✅' : '❌ Not Reservable ❌'}
                  </P>
                </>

              )}


              {activeInfo === 'payment' && (
                <>
                  <P>
                    {Number(acceptsCreditCards) === 1 ? '✅ Accepts Credit Cards ✅' : '❌ Does Not Accept Credit Cards ❌'}
                  </P>
                  <P>
                    {Number(acceptsDebitCards) === 1 ? '✅ Accepts Debit Cards ✅' : '❌ Does Not Accept Debit Cards ❌'}
                  </P>
                  <P>
                    {Number(acceptsNfc) === 1 ? '✅ Contactless Payments Accepted ✅' : '❌ No Contactless Payments ❌'}
                  </P>
                  <P>
                    {Number(acceptsCashOnly) === 1 ? '✅ Cash Only ✅' : '❌ Cash & Cards ❌'}
                  </P>
                </>
              )}

          </CardView>)}

          </View>

          <CardView style={styles.ratingContainer}>
            <P style={styles.stars}>{renderStars(rating)}</P>

            <P>{renderPriceLevel(Array.isArray(priceLevel) ? priceLevel[0] : priceLevel)}</P>
          </CardView>

          {description && (
            <CardView style={styles.ratingContainer}>
              <H3>{String(description)}</H3>
            </CardView>
          )}

          {formattedAddress && (
            <CardView style={[styles.ratingContainer,{alignItems:"center"}]}>
              <FontAwesome5 name="building" size={20} color="black" style={styles.labelIcons} /><H3>{String(formattedAddress)}</H3>
            </CardView>
          )}
          {nationalPhoneNumber && (
            <CardView style={[styles.ratingContainer,{alignItems:"baseline"}]}>
              <FontAwesome5 name="phone-alt" size={20} color="black" style={styles.labelIcons} /><H3>{String(nationalPhoneNumber)}</H3>
            </CardView>
          )}

        {regularOpeningHours && (
          <CardView style={styles.hoursBox}>
            <TouchableOpacity onPress={() => setHoursOpen(!hoursOpen)} style={styles.dropdownButton}>
              <H3 style={{textAlign:"center"}}>{hoursOpen ? '▲ Hide Opening Hours ▲' : '▼ Show Opening Hours ▼'}</H3>
            </TouchableOpacity>

            {hoursOpen &&
              String(regularOpeningHours)
                .split(/[\n;|]+/)
                .map((line, index) => (
                  <P key={index} style={styles.contactText}>
                    {line.trim()}
                  </P>
                ))}
          </CardView>
        )}
      </ScrollView>
    </BackgroundView>
    // </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  scrollContainer: {
    flex: 1,
    flexDirection:"column",
    width: '100%',
    height: "100%",
    gap:20,
  },
  
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
    gap:10
  },
  container: {
    flex: 1,
    //backgroundColor: '#f5f5a3',
    alignItems: 'center',
  },
  largeImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom:10
  },
  labelIcons:{
    margin:5
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems:"flex-start"
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#f8f8f8',
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
    //backgroundColor: '#f4a261',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    // width: '90%',
    alignItems: 'center',
    shadowOffset: {height:15,width:0}
  },
  noticeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    textAlign: 'left',
    width: '90%',
  },

  dropdownButton: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    width:"100%"
  },

  dropdownText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  hoursBox: {
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
    textAlign:"center",
    textAlignVertical:"center",
    alignItems:"center",
    justifyContent:"center"
    //backgroundColor: '#ddd',
  },
  stars: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuTray: {
    width: '90%',
    height: '80%',
    //backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },

});