import { useEffect, useState } from 'react'
import PlacesList from '../components/Places/PlacesList'
import { useIsFocused } from '@react-navigation/native'
import type Place from '../models/Place'
import { fetchPlaces } from '../utils/database'

export interface Props {
  route: any
}

function AllPlaces ({ route }: Props) {
  const isFocused = useIsFocused()
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([])
  useEffect(() => {
    async function loadPlaces () {
      const places = await fetchPlaces()
      setLoadedPlaces(places as Place[])
    }

    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused, route])
  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
