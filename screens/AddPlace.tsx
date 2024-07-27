import PlaceForm from '../components/Places/PlaceForm'
import type Place from '../models/Place'
import { insertPlace } from '../utils/database'

export interface Props {
  navigation: any
}

const AddPlace: React.FC<Props> = ({ navigation }: Props) => {
  function createPlaceHandler (place: Place): void {
    insertPlace(place).then(() => {
      navigation.navigate('AllPlaces')
    },
    (error) => {
      console.log(error)
    })
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
