import React from 'react' // Permet d'utiliser React
import { View, Text, StyleSheet, Pressable } from 'react-native' // Permet d'utiliser des composants React Native

// On crée le composant CityRow qui permet d'afficher une ville
const CityRow = ({ item, navigation, setSearchQuery }) => (
  <Pressable
    onPress={() => {
      navigation.navigate('MeteoCity', { insee: item.insee })
      setSearchQuery('')
    }}
  >
    <View style={styles.row}>
      <View>
        <Text style={styles.primaryText}>{item.name}</Text>
      </View>
    </View>
  </Pressable>
)

// On crée le style du composant CityRow
const styles = StyleSheet.create({
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  secondaryText: { color: 'grey' },
})

export default CityRow
