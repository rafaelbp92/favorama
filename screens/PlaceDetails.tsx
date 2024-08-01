import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../constants/Colors'
import { useEffect, useState } from 'react'
import { fetchPlaceDetails } from '../utils/database'
import type Place from '../models/Place'

export interface Props {
  route: any
  navigation: any
}

function PlaceDetails ({ route, navigation }: Props): React.JSX.Element {
  const [place, setPlace] = useState<Place>()
  function showOnMapHandler (): void {
    navigation.navigate('Map', {
      initialLat: place?.location.latitude,
      initialLng: place?.location.longitude
    })
  }

  const selectedPlaceId = route.params.placeId
  useEffect(() => {
    async function loadPlaceData (): Promise<void> {
      const placeDetails = await fetchPlaceDetails(selectedPlaceId as string)
      setPlace(placeDetails)
      navigation.setOptions({
        title: placeDetails.title
      })
    }

    void loadPlaceData()
  }, [selectedPlaceId])

  if (place === undefined) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
      <OutlinedButton icon="map" onPress={showOnMapHandler}>
        View on Map
      </OutlinedButton>
    </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})
