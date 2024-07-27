import * as SQLite from "expo-sqlite";
import Place from "../models/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve(null);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place: Place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          console.log("fetch result", result);
          const places = [];
          for (const item of result.rows._array) {
            places.push({
              title: item.title,
              imageUri: item.imageUri,
              address: item.address,
              location: {
                latitude: item.lat,
                longitude: item.lng,
              },
              id: item.id,
            } as Place);
          }
          resolve(places);
        },
        (_, error) => {
          console.log("fetch errror", error);
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(placeId: string) {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [placeId],
        (_, result) => {
          const place = result.rows._array[0];
          resolve({
            title: place.title,
            imageUri: place.imageUri,
            address: place.address,
            location: {
              latitude: place.lat,
              longitude: place.lng,
            },
            id: place.id,
          } as Place);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}
