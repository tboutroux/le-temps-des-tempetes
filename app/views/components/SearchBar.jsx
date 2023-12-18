import * as React from 'react' // Permet d'utiliser React
import { Searchbar } from 'react-native-paper' // Permet d'utiliser le composant Searchbar de Paper

// On crée le composant SearchBar qui permet de rechercher une ville dans la liste des villes de l'API de Météo France
const SearchBar = ({ searchQuery, setSearchQuery, setvalueResearch }) => {
  const onChangeSearch = (query) => setSearchQuery(query)

  // On utilise useEffect pour mettre à jour la valeur de recherche
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}

// On exporte le composant SearchBar
export default SearchBar
