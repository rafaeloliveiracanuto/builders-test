import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  ImageBackground,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Settings from './Settings'
import Network from './Network'
import sunBackground from './assets/sun_background.jpg'
 
const App = () => {
  const [weather, setWeather] = useState(null)

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
              const latitude = position.coords.latitude
              const longitude = position.coords.longitude

              Network.fetchWeatherData(latitude, longitude).then((res) => {
                setWeather(res)
              })
            },
            (error) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View>

      </View>
      <Text>Test</Text>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
 
export default App
