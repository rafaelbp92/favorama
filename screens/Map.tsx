import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const Map = () => {
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.042,
    };
    return <MapView style={styles.map} initialRegion={region}></MapView>
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})