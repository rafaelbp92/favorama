import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import Place from "../models/Place";

export type Props = {
  route: any;
};

function AllPlaces({ route }: Props) {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
