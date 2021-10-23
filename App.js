import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
 
const App = () => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const appID = '2075845c5f5059ae1871deb63ffea0cb'

  useEffect(() => {
    requestLocationPermission()
  })

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'The App needs access to your location' +
            'so you can see your weather data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              console.log(position)
              getWeatherData(position.coords.latitude, position.coords.longitude, appID)
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      } else {
        console.log('Location permission denied')

      }
    } catch (err) {
      console.warn(err)
    }
  }

  const getWeatherData = async (lat, lon, id) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Test</Text>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
 
export default App
