import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const Map = ({ position, closeMap }) => {
  const [showTitle, setShowTitle] = useState(true);     // Control display title - show/hide

  const handleTitle = (() => {
    setShowTitle(false)
    setShowTitle(true)
  });

  const {lat, lon} = position;
  
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker
        coordinate={{latitude: lat, longitude: lon}}
        title={showTitle ? `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}` : null}
        onPress={handleTitle}/>
      </MapView>

      <TouchableOpacity style={styles.closeButton} onPress={closeMap}>
        <Ionicons name="close" size={24} color="#ff5c5c" />     // "X"
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    paddingVertical: 5, 
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 5,         // Shadow for Android
    shadowColor: '#000',  // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default Map;
