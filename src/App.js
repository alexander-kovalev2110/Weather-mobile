import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Weather from './components/Weather';
import CityForm from './components/CityForm';
import Map from './components/Map';

const API_KEY = '3118e1074b36e87559c63a508a11d07b';

const App = () => {
  const [city, setCity] = useState('London');
  const [store, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);    // State for displaying the map
  const [openForm, setOpenForm] = useState(false);  // State for City input modal window
  const [position, setPosition] = useState({});     // Geographic coordinates

  useEffect(() => {
    setLoading(true);
    const fetchWeather = async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setPosition(response.data.coord);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather(city);
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <Weather store={store} setOpenForm={setOpenForm} setShowMap={setShowMap} />
        
        {openForm && <CityForm setCity={setCity} closeForm={() => setOpenForm(false)} />}
        
        {showMap && <Map position={position} closeMap={() => setShowMap(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
