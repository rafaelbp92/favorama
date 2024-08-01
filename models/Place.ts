import { type MapLocation } from './Location'

class Place {
  id!: string
  title: string
  imageUri: string
  address: string
  location: MapLocation
  constructor (title: string, imageUri: string, address: string, location: any) {
    this.title = title
    this.imageUri = imageUri
    this.address = address
    this.location = { latitude: location.latitude, longitude: location.longitude }
  }
}

export default Place
