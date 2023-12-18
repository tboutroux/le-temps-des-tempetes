import * as React from 'react' // Permet d'utiliser React
import { StyleSheet, Text, View } from 'react-native' // Permet d'utiliser des composants React Native
import SearchBar from './components/SearchBar' // Permet d'utiliser le composant SearchBar
import Api from '../models/Api'  // Permet d'utiliser la classe Api
import { useEffect } from 'react' // Permet d'utiliser useEffect
import CityPicker from './components/CityPicker' // Permet d'utiliser le composant CityPicker

// On crée le composant App qui permet d'afficher l'application
export default function App({ navigation }) {
  // On initialise les variables d'état
  const [searchQuery, setSearchQuery] = React.useState('')
  const [valueResearch, setvalueResearch] = React.useState()

  // On utilise useEffect pour mettre à jour la valeur de recherche
  const meteoAPI = new Api()
  useEffect(() => {
    fetchMeteo(searchQuery)
  }, [searchQuery])

  // On utilise une fonction asynchrone pour récupérer les données de l'API
  const fetchMeteo = async (searchQuery) => {
    if (searchQuery.length >= 2) {
      const result = await meteoAPI.search(searchQuery)
      setvalueResearch(result.cities)
    } else {
      // @ts-ignore
      setvalueResearch([])
    }
  }

  // On retourne le JSX qui permet d'afficher l'application
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>
          Bienvenue sur votre application météo favorite
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setvalueResearch={setvalueResearch}
        />
        <CityPicker
          navigation={navigation}
          cities={valueResearch}
          setSearchQuery={setSearchQuery}
        />
      </View>
    </View>
  )
}

// On crée le style du composant App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `#13131A`,
  },
  text: {
    margin: 20,
    marginBottom: 100,
    fontSize: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: `#fff`,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  bodyContainer: {
    flex: 1,
    marginBottom: 40,
    minWidth: 100,
  },
  searchBar: {},
})
