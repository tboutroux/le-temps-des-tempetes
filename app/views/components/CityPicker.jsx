import React from 'react' // Permet d'utiliser React
import { FlatList } from 'react-native' // Permet d'utiliser des composants React Native
import CityRow from './CityRow' // Permet d'utiliser le composant CityRow

// On crée le composant CityPicker qui permet de sélectionner une ville
const CityPicker = ({ cities, navigation, setSearchQuery }) => {
  const _renderItem = ({ item }) =>
    cities.indexOf(item) < 5 && (
      <CityRow
        navigation={navigation}
        item={item}
        setSearchQuery={setSearchQuery}
      ></CityRow>
    )

  return <FlatList data={cities} renderItem={_renderItem} />
}

export default CityPicker
