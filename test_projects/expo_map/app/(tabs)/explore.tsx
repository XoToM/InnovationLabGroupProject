import React, { useState } from 'react';
import { StyleSheet, Platform, View  } from 'react-native';

import Mapbox from '@rnmapbox/maps';


Mapbox.setAccessToken('');

export default function Map() {
	return <View style={styles.page} >
	  <Mapbox.MapView style={StyleSheet.absoluteFillObject} scaleBarEnabled={false} compassEnabled={true}/>
  </View>;
}

const styles = StyleSheet.create({
	page: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  position: 'relative'
	},
	container: {
	  height: 300,
	  width: 300,
	},
	map: {
	  flex: 1
	}
  });
