import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/Colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Place from '../../models/Place'
import Button from '../ui/Button'
import { type MapLocation } from '../../models/Location'

export interface Props {
  onCreatePlace: (place: Place) => void
}

const PlaceForm: React.FC<Props> = ({ onCreatePlace }: Props) => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [pickedLocation, setPickedLocation] = useState<MapLocation>()
  const [address, setAddress] = useState<string>('')

  function changeTitleRender (enteredText: string): void {
    setEnteredTitle(enteredText)
  }

  function imageTakenHandller (imageUri: string): void {
    setSelectedImage(imageUri)
  }

  const pickLocationHandler = useCallback((location: MapLocation, address: string) => {
    setPickedLocation(location)
    setAddress(address)
  }, [])

  function savePlaceHandler (): void {
    const placeData = new Place(enteredTitle, selectedImage, address, pickedLocation)
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formView}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleRender}
          value={enteredTitle}
        />
        <ImagePicker onImageTake={imageTakenHandller} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form: {
    flex: 1
  },
  formView: {
    padding: 24
  },
  label: {
    fontWeight: 'bold',
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
})
