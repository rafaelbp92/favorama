import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions
} from 'expo-location'
import OutlinedButton from '../ui/OutlinedButton'
import { Colors } from '../../constants/Colors'
import { useEffect, useState } from 'react'
import { getAddress, getMapPreview } from '../../utils/location'
import {
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { type MapLocation } from '../../models/Location'

export interface Props {
  onPickLocation: (location: MapLocation, address: string) => void
}

const LocationPicker: React.FC<Props> = ({ onPickLocation }: Props) => {
  const [pickedLocation, setPickedLocation] = useState<MapLocation | undefined>()
  const [locationPermission, requestPermission] = useForegroundPermissions()
  const navigation = useNavigation()
  const route = useRoute<any>()
  const isFocused = useIsFocused()

  useEffect(() => {
    const mapPickedlocation = isFocused &&
      route.params !== undefined
      ? {
          latitude: route.params.pickedLocation.latitude,
          longitude: route.params.pickedLocation.longitude
        }
      : undefined

    if (mapPickedlocation !== undefined) {
      setPickedLocation(mapPickedlocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    async function handleLocation (): Promise<void> {
      if (pickedLocation !== undefined) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude
        )
        onPickLocation(pickedLocation, address)
      }
    }

    void handleLocation()
  }, [pickedLocation, onPickLocation])

  async function verifyPermissions (): Promise<boolean> {
    if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (locationPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Required permissions',
        'The app needs permission to the camera'
      )
      return false
    }

    return true
  }

  function getLocationHandler (): void {
    verifyPermissions().then((hasPermission) => {
      if (hasPermission) {
        void getCurrentPositionAsync()
          .then((location) => {
            setPickedLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  function pickOnMapHandler (): void {
    navigation.navigate('Map' as never)
  }

  let locationPreview = <Text>No location picked</Text>

  if (pickedLocation !== undefined) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude) }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})
