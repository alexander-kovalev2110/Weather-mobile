import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Properties from './Properties';

const Weather = ({ store, setOpenForm, setShowMap }) => {
  const { name, dt, timezone, sys: { sunrise, sunset }, weather, main: { temp } } = store;
  const { description, icon } = weather[0];

  const time = new Date((dt + timezone - 7200) * 1000).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  const isDay = dt >= sunrise && dt < sunset;   // Daytime  
  const backgroundImage = isDay
      ? require('./icons/day.png')    // Daytime background
      : require('./icons/night.png'); // Night background

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.top}>
        <View style={styles.city}>
          <Text style={styles.citySubtitle}>Weather Today in</Text>
          <TouchableOpacity style={styles.cityButton} onPress={() => setOpenForm(true)}>
            <Text style={styles.cityTitle}>{name}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cityInfo}>
          <View style={styles.topLeft}>
            <Image
              style={styles.icon}
              source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
            />
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.topRight}>
            <Text style={styles.cityInfoSubtitle}>as of {time}</Text>
            <Text style={styles.cityInfoTitle}>{temp}°C</Text>
          </View>
        </View>
      </View>

      <Properties store={store} setShowMap={setShowMap} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '32%',
  },
  top: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  city: {
    marginBottom: 10,
  },
  citySubtitle: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  cityButton: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  cityTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#8781c5',
    color: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 15,
    marginTop: 6,
    borderRadius: 8,
  },
  cityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  icon: {
    width: 80,
    height: 80,
  },
  description: {
    marginLeft: 10,
    fontSize: 20,
    color: '#fff',
  },
  topRight: {
    alignItems: 'flex-end',
  },
  cityInfoSubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  cityInfoTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Weather;
