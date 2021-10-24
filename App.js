import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Network from './Network'
import sunBackground from './assets/sun_background.jpg'
import weather1 from './assets/weather_1.png'
import weather2 from './assets/weather_2.png'
import weather3 from './assets/weather_3.jpeg'
import weather4 from './assets/weather_4.jpeg'
 
const App = () => {
  const [weather, setWeather] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    //requestLocationPermission()
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

  const climate = weather?.main

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ImageBackground source={weather4} resizeMode={'cover'} style={styles.background}>
            <Text style={styles.cityText}>Caicó</Text>
            <View style={styles.tempWrapper}>
              <Text style={styles.tempText}>35º</Text>
            </View>
            <View style={styles.contentGroup}>
              <Text style={{ borderWidth: 1 }}>Oi</Text>
            </View>
            <View style={{ height: '95%', alignItems: 'center', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.button} onPress={requestLocationPermission}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.text}>{weather?.name}</Text>
            <Text style={styles.text}>{climate?.temp}</Text>
            <Text style={styles.text}>{climate?.feels_like}</Text>
            <Text style={styles.text}>{climate?.temp}</Text>
            <Text style={styles.text}>{climate?.temp_min}</Text>
            <Text style={styles.text}>{climate?.temp_max}</Text>
            <Text style={styles.text}>{climate?.pressure}</Text>
            <Text style={styles.text}>{climate?.humidity}</Text>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  container: {
    //justifyContent: 'flex-start',
    height: '96%',
    width: '95%',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderBottomWidth: 15,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    //position: 'absolute',
    marginTop: '1%',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'white',
    //position: 'absolute',
    //left: '30%',
    //bottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
  },
  text: {
    color: 'black',
    marginBottom: 20,
  },
  tempText: {
    fontSize: 70,
    color: '#00008B',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  cityText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '15%',
    marginLeft: '5%',
  },
  tempWrapper: {
    position: 'absolute', 
    marginTop: '5%',
    left: '60%',
  },
  background: {
    height: '100%', 
    width: '100%', 
    opacity: 0.8,
  },
  contentGroup: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    //bottom: 0,
  },
})
 
export default App
