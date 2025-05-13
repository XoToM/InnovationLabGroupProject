import { H1, H2, H3, P } from '@/components/text';
import { BackgroundView, CardView } from '@/components/views';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
const router = useRouter();
export default function App() {
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
    <BackgroundView style={styles.container}>
      {/* Header */}
      {/* <CardView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="menu" size={36} />
        </TouchableOpacity>

        <H1 style={{ flexShrink: 1, flexGrow: 1, textAlign: 'center', }}>{String(name)}</H1>


        <TouchableOpacity onPress={() => router.push('./settings')}>
          <Ionicons name="settings" size={36} />
        </TouchableOpacity>
      </CardView>
        
      </CardView>
      <ScrollView style={styles.scrollContainer}> 
        <BackgroundView style={styles.container}>
        */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}> {/*you need scroll view to scroll but then you need background to make it look good. thats why its nested like this freaky deaky ass shit*/}



          {photo ? (
            <Image source={{ uri: String(photo) }} style={[styles.largeImage, { resizeMode: "stretch" }]} />
          ) : (
            <P>No image available</P>
          )}

          <CardView style={styles.buttonContainer}>
            {[
              { type: 'accessibility', label: ' ♿ ' },
              { type: 'familyPets', label: ' 🐶 ' },
              { type: 'services', label: ' 🍽️ ' },
              { type: 'payment', label: ' 💳 ' },
            ].map(({ type, label }) => (

              <CardView key={type} style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.iconButton} onPress={() => toggleInfo(type)}>
                  <P style={styles.iconText}>{String(label)}</P>
                </TouchableOpacity>
                {activeInfo === type && <P>▲</P>}
              </CardView>
            ))}
          </CardView>


          {activeInfo && (
            <CardView style={styles.noticeBox}>
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

            </CardView>
          )}

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
            <CardView style={styles.ratingContainer}>
              <H2>{String(formattedAddress)}</H2>
            </CardView>
          )}

          {nationalPhoneNumber && (
            <CardView style={styles.ratingContainer}>
              <H2>{String(nationalPhoneNumber)}</H2>
            </CardView>
          )}

        {regularOpeningHours && (
          <CardView style={styles.hoursBox}>
            <TouchableOpacity onPress={() => setHoursOpen(!hoursOpen)} style={styles.dropdownButton}>
              <P>{hoursOpen ? '▼ Hide Opening Hours ▼' : '▲ Show Opening Hours ▲'}</P>
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

  );

}

const styles = StyleSheet.create({

  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    //backgroundColor: '#f5f5a3',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    //backgroundColor: '#8BC34A',
    flexWrap: 'wrap',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pageTitle: {
    //backgroundColor: '#c5da8c',
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  largeImage: {
    width: '90%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
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
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
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
    marginVertical: 10,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    textAlign: 'left',
    width: '90%',
    marginBottom: 4,
  },

  dropdownButton: {
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: 20,
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
    marginBottom: 10,
    alignSelf: 'center',
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