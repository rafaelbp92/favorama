import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "../../models/Place";

export type Props = {
    onCreatePlace: (place: Place) => void;
};

const PlaceForm = ({onCreatePlace} : Props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleRender(enteredText: string) {
        setEnteredTitle(enteredText);
    }

    function imageTakenHandller(imageUri: string) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location: any) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleRender} value={enteredTitle} />
            </View>
            <ImagePicker onImageTake={imageTakenHandller}/>
            <LocationPicker onPickLocation={pickLocationHandler}/>
            <Pressable onPress={savePlaceHandler}>Add Place</Pressable>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        backgroundColor: Colors.primary100
    }
});