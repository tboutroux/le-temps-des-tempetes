import * as React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Api from '../models/Api'
import weatherCode from '../services/weatherCode'

const MeteoCity = ({ navigation, route }) => {
  const meteoAPI = new Api()

  const [meteoCityFor5Days, setMeteoCityFor5Days] = React.useState({})
  //Objet factice pour eviter les erreurs dans le code
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
  })
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    getMeteoForCity(route.params.insee)
    getMeteoForCity5days(route.params.insee)
  }, [])

  const getMeteoForCity = async (insee) => {
    const result = await meteoAPI.getMeteoForCityForNextHour(insee)
    setMeteoCity(result)
    setLoading(false)
  }

  const getMeteoForCity5days = async (insee) => {
    const result = await meteoAPI.getMeteoForCityFor5Days(insee)
    setMeteoCityFor5Days(result)
  }

  const dateFormat = (dateISO) => {
    const date = new Date(dateISO)
    const dateFormat =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() //prints expected format.

    return dateFormat
  }

  const renderItem = ({ item }) => (
    <View style={styles.previsionView} key={item.datetime}>
      <Text style={styles.previsionTitle}>{dateFormat(item.datetime)}</Text>
      <Text>{weatherCode[item.weather]}</Text>
      <Text>
        T°Max : {item.tmax} T°Min : {item.tmin}
      </Text>
      <Text>
        Rafale de vent à 10 mètres : {item.wind10m}
        {' km/h '}
      </Text>
    </View>
  )

  return (
    <>
      {!loading && (
        <>
          <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {meteoCity.city.name} {meteoCity.forecast[0][3].temp2m}˚
              </Text>
              <Text style={styles.subtitle}>
                {weatherCode[meteoCity.forecast[0][3].weather]}
              </Text>
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
  )
}

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
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
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
})

export default MeteoCity
