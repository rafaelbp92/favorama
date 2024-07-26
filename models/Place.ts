import { MapLocation } from "./Location";

class Place {
  id!: string;
  title: string;
  imageUri: string;
  address: string;
  location: MapLocation;
  constructor(title: string, imageUri: string, location: any) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { latitude: location.lat, longitude: location.lng };
  }
}

export default Place;
