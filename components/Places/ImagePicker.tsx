import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions
} from 'expo-image-picker'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import OutlinedButton from '../ui/OutlinedButton'

export interface Props {
  onImageTake: (a: string) => void
}

const ImagePicker: React.FC<Props> = ({ onImageTake }: Props) => {
  const [pickedImage, setPickedImage] = useState('')
  const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions()

  async function verifyPermissions (): Promise<boolean> {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Required permissions',
        'The app needs permission to the camera'
      )
      return false
    }

    return true
  }

  async function takeImageHandler (): Promise<void> {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })

    if (image.assets && (image.assets.length > 0)) {
      setPickedImage(image.assets[0].uri)
      onImageTake(image.assets[0].uri)
    }
  }

  let imagePreview = <Text>No image preview</Text>

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />
  }

  return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take image</OutlinedButton>
        </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
