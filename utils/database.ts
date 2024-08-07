import * as SQLite from 'expo-sqlite'
import type Place from '../models/Place'

const database = SQLite.openDatabase('places.db')

export async function init (): Promise<unknown> {
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
          resolve(null)
        },
        (_, error) => {
          reject(error)
          return false
        }
      )
    })
  })

  return await promise
}

export async function insertPlace (place: Place): Promise<unknown> {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude
        ],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
          return false
        }
      )
    })
  })

  return await promise
}

export async function fetchPlaces (): Promise<Place[]> {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const places = []
          for (const item of result.rows._array) {
            const place = {
              title: item.title,
              imageUri: item.imageUri,
              address: item.address,
              location: {
                latitude: item.lat,
                longitude: item.lng
              },
              id: item.id
            }
            places.push(place)
          }
          resolve(places)
        },
        (_, error) => {
          console.log('fetch errror', error)
          reject(error)
          return false
        }
      )
    })
  })

  return await promise
}

export async function fetchPlaceDetails (placeId: string): Promise<Place> {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [placeId],
        (_, result) => {
          const place = result.rows._array[0]
          const placeDb = {
            title: place.title,
            imageUri: place.imageUri,
            address: place.address,
            location: {
              latitude: place.lat,
              longitude: place.lng
            },
            id: place.id
          }
          resolve(placeDb)
        },
        (_, error) => {
          reject(error)
          return false
        }
      )
    })
  })

  return await promise
}
