import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { MapLocation } from "../models/Location";

const Map = () => {
  const [selectLocation, setSelectedLocation] = useState<MapLocation>();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.042,
  };
  function selectLocationHandler(event: MapPressEvent) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude: lat, longitude: lng });
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation?.latitude,
            longitude: selectLocation?.longitude,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
