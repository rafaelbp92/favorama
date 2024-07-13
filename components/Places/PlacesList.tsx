import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Place from "../../models/Place";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";

export type Props = {
  places: Place[];
};

const PlacesList: React.FC<Props> = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbacktext}>No places added yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}}/>}
      keyExtractor={(item: Place) => {
        return item.id;
      }}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 2,
  },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbacktext:  {
        fontSize: 16,
        color: Colors.primary200
    }
});