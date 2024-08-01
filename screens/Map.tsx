import { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import MapView, { type MapPressEvent, Marker } from 'react-native-maps'
import { type MapLocation } from '../models/Location'
import IconButton from '../components/ui/IconButton'

export interface Props {
  navigation: any
  route: any
}

const Map: React.FC<Props> = ({ navigation, route }: Props) => {
  const initialLocation = route.params !== undefined
    ? {
        latitude: route.params.initialLat,
        longitude: route.params.initialLng
      }
    : undefined

  const [selectLocation, setSelectedLocation] =
    useState<MapLocation | undefined>(initialLocation)

  const region = {
    latitude: initialLocation !== undefined ? initialLocation.latitude : 37.78,
    longitude: initialLocation !== undefined ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.042
  }

  function selectLocationHandler (event: MapPressEvent): void {
    if (initialLocation !== undefined) return
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation({ latitude: lat, longitude: lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (selectLocation === undefined) {
      Alert.alert('No location picked!')
      return
    }

    navigation.navigate('AddPlace', { pickedLocation: selectLocation })
  }, [navigation, selectLocation])

  useLayoutEffect(() => {
    if (initialLocation !== undefined) return
    navigation.setOptions({
      headerRight: ({ tintColor }: any) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation, savePickedLocationHandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectLocation !== undefined && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation?.latitude,
            longitude: selectLocation?.longitude
          }}
        />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
