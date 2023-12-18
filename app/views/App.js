import * as React from 'react' // Import de React
import { NavigationContainer } from '@react-navigation/native' // Import de NavigationContainer
import { createNativeStackNavigator } from '@react-navigation/native-stack' // Import de createNativeStackNavigator
import SearchCity from './SearchCity' // Import de SearchCity
import MeteoCity from './MeteoCity' // Import de MeteoCity

const Stack = createNativeStackNavigator() // Création de la navigation

const App = () => {
  return (
    // On retourne la navigation
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SearchCity}
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen name="MeteoCity" component={MeteoCity} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
