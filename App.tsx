import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/Colors'
import Map from './screens/Map'
import { useEffect, useState } from 'react'
import { init } from './utils/database'
import { } from 'expo-splash-screen'
import PlaceDetails from './screens/PlaceDetails'
import * as SplashScreen from 'expo-splash-screen'

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App (): React.JSX.Element {
  const [dbInitilizedState, setDbInitializedState] = useState(false)

  useEffect(() => {
    init()
      .then(async () => {
        setDbInitializedState(true)
        await SplashScreen.hideAsync()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!dbInitilizedState) {
    return <div />
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate('AddPlace')
                  }}
                />
              )
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add a New Place' }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
