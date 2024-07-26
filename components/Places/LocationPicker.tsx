import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../utils/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

type Location = {
  lat: number;
  lng: number;
};

export type Props = {
  onPickLocation: (a: any) => void;
};

const LocationPicker = ({ onPickLocation }: Props) => {
  const [pickedLocation, setPickedLocation] = useState<Location | undefined>();
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const mapPickedlocation = isFocused &&
      route.params && {
        lat: route.params.pickedLocation.latitude,
        lng: route.params.pickedLocation.longitude,
      };

    if (mapPickedlocation) {
      setPickedLocation(mapPickedlocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Required permissions",
        "The app needs permission to the camera"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map" as never);
  }

  let locationPreview = <Text>No location picked</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
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
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
