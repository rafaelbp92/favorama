import PlaceForm from "../components/Places/PlaceForm";
import Place from "../models/Place";
import { insertPlace } from "../utils/database";

export type Props = {
  navigation: any;
};

const AddPlace = ({ navigation }: Props) => {
  function createPlaceHandler(place: Place) {
    insertPlace(place).then(() => {
      navigation.navigate("AllPlaces");
    })
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
