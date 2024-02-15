import { MapLocation } from "./Location";

class Place {
    id: string;
    title: string;
    imageUri: string;
    address: string;
    location: MapLocation;
    constructor(title: string, imageUri: string, address: string, location: MapLocation) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}

export default Place;