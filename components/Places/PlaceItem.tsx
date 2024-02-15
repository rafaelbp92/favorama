import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Place from "../../models/Place";

export type Props = {
  place: Place;
  onSelect: () => void ;
};

const PlaceItem: React.FC<Props> = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
