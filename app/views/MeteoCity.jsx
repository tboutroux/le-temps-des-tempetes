import * as React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native'; // Import des composants nécessaires
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Api from '../models/Api';
import weatherCode from '../services/weatherCode';

const MeteoCity = ({ navigation, route }) => {
  const meteoAPI = new Api();

  const [meteoCityFor5Days, setMeteoCityFor5Days] = React.useState({});
  const [meteoCity, setMeteoCity] = React.useState({
    city: { name: '' },
    forecast: [
      [],
      [],
      [],
      [
        {
          cp: 93170,
          datetime: '2022-03-01T19:00:00+0100',
          day: 0,
          dirwind10m: 113,
          gust10m: 22,
          gustx: 22,
          insee: '93006',
          latitude: 48.8691,
          longitude: 2.4227,
          period: 3,
          probafog: 0,
          probafrost: 10,
          probarain: 20,
          probawind70: 0,
          probawind100: 0,
          rr1: 0,
          rr10: 0,
          temp2m: 10,
          weather: 5,
          wind10m: 5,
        },
      ],
    ],
  });
  
  const [loading, setLoading] = React.useState(true);
  const [isCelsius, setIsCelsius] = React.useState(true);

  const getWeatherIcon = (weatherCode) => {
    // Catégories de codes météo
    const sunnyCodes = [0];
    const partlySunnyCodes = [1, 3];
    const cloudyCodes = [2, 4, 5];
    const fogCodes = [6, 7];
    const rainCodes = [10, 11, 12, 40, 41, 42, 43, 44, 45, 46, 47, 48, 73, 74, 75, 76, 77, 78, 210, 211, 212, 220, 221, 222, 235];
    const snowCodes = [20, 21, 22, 30, 31, 32, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 80, 81, 82, 83, 84, 85, 86, 87, 230, 231, 232];
    const stormCodes = [100, 101, 102, 103, 104, 105, 106, 107, 108, 120, 121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142];
  
    if (sunnyCodes.includes(weatherCode)) {
      return require('../assets/sunny.png'); // Icône ensoleillée
    } else if (partlySunnyCodes.includes(weatherCode)) {
      return require('../assets/partly-sunny.png'); // Icône partiellement ensoleillée
    } else if (fogCodes.includes(weatherCode)) {
      return require('../assets/fog.png'); // Icône de brouillard
    } else if (cloudyCodes.includes(weatherCode)) {
      return require('../assets/cloudy.png'); // Icône nuageuse
    } else if (rainCodes.includes(weatherCode)) {
      return require('../assets/rainy-day.png'); // Icône de pluie
    } else if (snowCodes.includes(weatherCode)) {
      return require('../assets/snowy.png'); // Icône de neige
    } else if (stormCodes.includes(weatherCode)) {
      return require('../assets/storm.png'); // Icône d'orage
    } else {
      return require('../assets/sunny.png'); // Icône par défaut pour les autres cas
    }
  };
  
  

  useEffect(() => {
    getMeteoForCity(route.params.insee);
    getMeteoForCity5days(route.params.insee);
  }, []);

  const getMeteoForCity = async (insee) => {
    const result = await meteoAPI.getMeteoForCityForNextHour(insee);
    setMeteoCity(result);
    setLoading(false);
  };

  const getMeteoForCity5days = async (insee) => {
    const result = await meteoAPI.getMeteoForCityFor5Days(insee);
    setMeteoCityFor5Days(result);
  };

  const dateFormat = (dateISO) => {
    const date = new Date(dateISO);
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  };

  const convertTempUnit = (temp) => {
    if (isCelsius) {
      return temp + '˚C';
    } else {
      const fahrenheitTemp = (temp * 9) / 5 + 32;
      return fahrenheitTemp.toFixed(2) + '˚F';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.previsionView} key={item.datetime}>
      <Text style={styles.previsionTitle}>{dateFormat(item.datetime)}</Text>
      <Image source={getWeatherIcon(item.weather)} style={styles.weatherIcon} />
      <Text>
        T°Max : {convertTempUnit(item.tmax)} T°Min : {convertTempUnit(item.tmin)}
      </Text>
      <Text>
        Rafale de vent à 10 mètres : {item.wind10m}
        {' km/h '}
      </Text>
    </View>
  );

  return (
    <>
      {!loading && (
        <>
          <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {meteoCity.city.name} {convertTempUnit(meteoCity.forecast[0][3].temp2m)}
              </Text>
              <Image source={getWeatherIcon(meteoCity.forecast[0][3].weather)} style={styles.weatherIcon} />
              <Text style={styles.subtitle}>
                {weatherCode[meteoCity.forecast[0][3].weather]}
              </Text>
              <TouchableOpacity onPress={() => setIsCelsius(!isCelsius)}>
                <Text style={styles.button}>Convertir température</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.weatherContainer}>
              <FlatList
                data={meteoCityFor5Days}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
  previsionView: {
    backgroundColor: '#98D7DC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previsionTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default MeteoCity;
