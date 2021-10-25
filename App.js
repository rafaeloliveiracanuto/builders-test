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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

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
        
          <ImageBackground source={weather4} resizeMode={'cover'} style={styles.background} imageStyle={{ borderRadius: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <Text style={styles.cityText}>Caicó</Text>
            <View style={styles.tempWrapper}>
              <Text style={styles.tempText}>35º</Text>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.contentGroup}>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherText}>Feels like</Text>
                  <View style={styles.weatherValueWrapper}>
                    <Text style={styles.weatherValue}>50</Text>
                    <Icon name='temperature-celsius' size={14} color='brown' />
                  </View>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherText}>Pressure</Text>
                  <View style={styles.weatherValueWrapper}>
                    <Text style={styles.weatherValue}>50</Text>
                    <IconFA5 name='arrow-down' size={14} color='brown' style={{ marginLeft: 3 }} />
                  </View>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherText}>Wind</Text>
                  <View style={styles.weatherValueWrapper}>
                    <Text style={styles.weatherValue}>50</Text>
                    <IconFA5 name='wind' size={14} color='brown' style={{ marginLeft: 3 }} />
                  </View>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherText}>Humidity</Text>
                  <View style={styles.weatherValueWrapper}>
                    <Text style={styles.weatherValue}>50</Text>
                    <Icon name='water' size={14} color='brown' />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 0 }}>
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
    justifyContent: 'center',
    height: '96%',
    width: '95%',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderBottomWidth: 15,
    borderBottomStartRadius: 35,
    borderBottomEndRadius: 35,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
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
    flex: 1,
    opacity: 0.8,
  },
  contentGroup: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
  },
  weatherItem: {
    flexDirection: 'column',
  },
  weatherText: {
    color: 'brown', 
    fontWeight: '700', 
    fontSize: 16
  },
  weatherValueWrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  weatherValue: {
    alignSelf: 'center', 
    color: 'brown', 
    fontWeight: '700'
  },
  mainContent: {
    justifyContent: 'center', 
    height: '90%', 
    width: '90%', 
    alignSelf: 'center'
  },
})
 
export default App
