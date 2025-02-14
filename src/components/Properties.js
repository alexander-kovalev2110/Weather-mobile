import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

const Properties = ({ store, setShowMap }) => {
  if (!store) return null;      // Check if store is not loaded

  const { main: { humidity, pressure }, 
          clouds: { all }, 
          wind: { speed }, 
          visibility } = store;

const properties = [
    { title: "Cloud Cover", value: `${all}%`, icon: require('./icons/cloud.png'), isClickable: false },
    { title: "Humidity", value: `${humidity}%`, icon: require('./icons/humidity.png'), isClickable: false },
    { title: "Wind Speed", value: `${speed} m/s`, icon: require('./icons/wind.png'), isClickable: false },
    { title: "Pressure", value: `${pressure} hPa`, icon: require('./icons/gauge.png'), isClickable: false },
    { title: "Visibility", value: `${visibility}m`, icon: require('./icons/visibility.png'), isClickable: false },
    { title: "Location", value: " ", icon: require('./icons/location.png'), isClickable: true },
  ];

  return (
    <View style={styles.propertyContainer}>
      {properties.map(({ title, value, icon, isClickable }) => (
        <View style={styles.propertyItem} key={title}>
          <View style={styles.propertyIcon}>
            {isClickable ? (
              <TouchableOpacity onPress={() => setShowMap(true)} >
                <Image source={icon} style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <Image source={icon} style={styles.icon} />
            )}
          </View>
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyValue}>{value}</Text>
            <Text style={styles.propertyDescription}>{title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  propertyContainer: {
    padding: 16,
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  propertyItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  propertyIcon: {
    width: 30,
    marginRight: 12,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',  // To keep the image proportional
  },
  propertyInfo: {
    flexDirection: 'column',
  },
  propertyValue: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
    color: '#000000',
  },
  propertyDescription: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: '#6b6b6b',
    marginTop: 3,
  },
});

export default Properties;
