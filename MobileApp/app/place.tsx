<<<<<<< HEAD
import React, { useState } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { Title, P, H1, H2, H3 } from '@/components/text';
import { TextBtn } from '@/components/interactive';
import { BackgroundView, CardView } from '@/components/views';
const router = useRouter();
export default function App() {
  const [activeInfo, setActiveInfo] = useState(null);
  const [hoursOpen, setHoursOpen] = useState(false);
  const { idPlace, name, formattedAddress, photo, wheelchairAccessibleParking, wheelchairAccessibleEntrance, wheelchairAccessibleRestroom, wheelchairAccessDescription, inductionLoop, inductionLoopDescription, description, rating, priceLevel, nationalPhoneNumber, latitude, longitude, regularOpeningHours, delivery, takeout, dineIn, outdoorSeating, liveMusic, allowsDogs, goodForChildren, goodForGroups, goodForWatchingSports, restroom, reservable, curbsidePickup, menuForChildren, acceptsCreditCards, acceptsDebitCards, acceptsCashOnly, acceptsNfc } = useLocalSearchParams(); //add additional parameters


  // const idPlace = 1;
  // const name = "The Friendly Cat";
  // const formattedAddress = "123 Fox Lane, Woodland City, WC1 2AB, UK";
  // const photo = "https://tse2.mm.bing.net/th/id/OIP._yk1QSrMikTretJkugcWjgHaDb?rs=1&pid=ImgDetMain";
  // const wheelchairAccessibleParking = 1;
  // const wheelchairAccessibleEntrance = 1;
  // const wheelchairAccessibleRestroom = 0;
  // const wheelchairAccessDescription = "Ramp at front entrance, no accessible restroom.";
  // const inductionLoop = 1;
  // const inductionLoopDescription = "Hearing loop available at the main bar.";
  // const description = "A vibrant, family-friendly gastropub with outdoor seating and live weekend music.";
  // const rating = 4;
  // const priceLevel = "PRICE_LEVEL_VERY_EXPENSIVE";
  // const nationalPhoneNumber = "+441234567890";
  // const latitude = 51.3781;
  // const longitude = -2.3597;
  // const regularOpeningHours = "Mon-Fri: 12PM-11PM | Sat-Sun: 11AM-12AM";
  // const delivery = 0;
  // const takeout = 1;
  // const dineIn = 0;
  // const outdoorSeating = 1;
  // const liveMusic = 1;
  // const allowsDogs = 1;
  // const goodForChildren = 1;
  // const goodForGroups = 1;
  // const goodForWatchingSports = 0;
  // const restroom = 1;
  // const reservable = 0;
  // const curbsidePickup = 0;
  // const menuForChildren = 1;
  // const acceptsCreditCards = 0;
  // const acceptsDebitCards = 1;
  // const acceptsCashOnly = 1;
  // const acceptsNfc = 1;
=======
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const [activeInfo, setActiveInfo] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { name, formattedAddress, latitude, longitude } =
    useLocalSearchParams(); //add additional parametrs
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3

  const toggleInfo = (type: any) => {
    setActiveInfo(activeInfo === type ? null : type);
  };

<<<<<<< HEAD
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
      <CardView style={styles.header}>
        <TouchableOpacity onPress={() => router.push('./map')}>
          <Ionicons name="menu" size={36} />
        </TouchableOpacity>

        <H1 style={{ flexShrink: 1, flexGrow: 1, textAlign: 'center', }}>{String(name)}</H1>


        <TouchableOpacity onPress={() => router.push('./settings')}>
          <Ionicons name="settings" size={36} />
        </TouchableOpacity>
      </CardView>
      <ScrollView style={styles.scrollContainer}> {/*you need scroll view to scroll but then you need background to make it look good. thats why its nested like this freaky deaky ass shit*/}
        <BackgroundView style={styles.container}>





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

          

          <CardView style={styles.hoursBox}>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setHoursOpen(!hoursOpen)}>
              <P>{hoursOpen ? '▼ Hide Opening Hours ▼' : '▲ Show Opening Hours ▲'}</P>
            </TouchableOpacity>

            {hoursOpen && (
              <P style={styles.contactText}>{String(regularOpeningHours)}</P>
            )}
          </CardView>




        </BackgroundView>
      </ScrollView>
    </BackgroundView>

  );

}

const styles = StyleSheet.create({

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
=======
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>EquiMap</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>{name}</Text>

      {/* Large Image */}
      <Image
        source={require("../assets/images/better-icon.png")}
        style={[styles.largeImage, { resizeMode: "stretch" }]}
      />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {[
          { type: "accessibility", label: "♿" },
          { type: "lgbt", label: "🏳️‍🌈" },
          { type: "custom1", label: "🔍" }, // Placeholder
          { type: "custom2", label: "🍽️" }, // Placeholder
        ].map(({ type, label }) => (
          <View key={type} style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => toggleInfo(type)}
            >
              <Text style={styles.iconText}>{label}</Text>
            </TouchableOpacity>
            {activeInfo === type && <Text style={styles.arrow}>▲</Text>}
          </View>
        ))}
      </View>

      {/* Info Box */}
      {activeInfo && (
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            {activeInfo === "accessibility"
              ? "This location has great disability access."
              : activeInfo === "lgbt"
              ? "This location supports LGBTQ+ inclusivity."
              : "Placeholder text for new button."}
          </Text>
        </View>
      )}

      {/* Rating & Pricing */}
      <View style={styles.ratingContainer}>
        <Text style={styles.stars}>⭐⭐⭐⭐☆</Text>
        <Text style={styles.price}>££</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuTray}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeText}>✖ Close</Text>
            </TouchableOpacity>
            {/* Add menu content here */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5a3",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#8BC34A",
    width: "100%",
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
<<<<<<< HEAD
=======
  logo: {
    width: 40,
    height: 40,
  },
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
<<<<<<< HEAD
  scrollContainer: {

  },
  pageTitle: {
    //backgroundColor: '#c5da8c',
    width: '100%',
    textAlign: 'center',
=======
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pageTitle: {
    backgroundColor: "#c5da8c",
    width: "100%",
    textAlign: "center",
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  largeImage: {
    width: "90%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#f8f8f8",
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
<<<<<<< HEAD
    //backgroundColor: '#f4a261',
=======
    backgroundColor: "#f4a261",
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  noticeText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
  },
<<<<<<< HEAD
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
    //backgroundColor: '#e0e0e0',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
=======
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
  stars: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    padding: 15,
  },
  modalContainer: {
    flex: 1,
<<<<<<< HEAD
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuTray: {
    width: '90%',
    height: '80%',
    //backgroundColor: '#fff',
=======
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    justifyContent: "center",
    alignItems: "center",
  },
  menuTray: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
<<<<<<< HEAD

=======
>>>>>>> 98e2ff42b3b1e17f9ecd8eeab57f858e7963d5e3
});
