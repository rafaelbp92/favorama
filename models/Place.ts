import { MapLocation } from "./Location";

class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: MapLocation;
  constructor(title: string, imageUri: string, location: any) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.adress;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}

export default Place;
