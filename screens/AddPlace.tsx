import PlaceForm from "../components/Places/PlaceForm";

export type Props = {
    navigation: any;
};

const AddPlace = ({ navigation }: Props) => {
    function createPlaceHandler(place: any) {
        navigation.navigate('AllPlaces', {
            place,
        });
    }

    return <PlaceForm onCreatePlace={createPlaceHandler}/>;
}

export default AddPlace;