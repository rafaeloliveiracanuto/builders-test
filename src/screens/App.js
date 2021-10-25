import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'

import Permission from '../actions/Permission'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import weather1 from '../assets/weather_1.png'
import weather2 from '../assets/weather_2.png'
import weather3 from '../assets/weather_3.jpeg'
import weather4 from '../assets/weather_4.jpeg'
 
const App = () => {
  const [weather, setWeather] = useState(null)
  const [image, setImage] = useState(weather1)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const changeBackground = (timezone) => {
    if (timezone) {
      const hour = new Date((new Date().getTime()) - weather?.timezone * 1000).getHours() - 3
      if (hour > 5 && hour < 12) {
        return weather1
      } else if (hour > 12 && hour < 18) {
        return weather4
      } else if (hour > 18 && hour < 23) {
        return weather3
      } else {
        return weather2
      }
    } else {
      return weather1
    }
  }

  const requestLocationPermission = () => {
    Permission.requestLocation(setWeather)
  }

  const climate = weather?.main
  const convertedTemp = (climate?.temp - 273.15).toFixed(1)
  const convertedFeels = (climate?.feels_like - 273.15).toFixed(1)
  const convertedMinTemp = (climate?.temp_min - 273.15).toFixed(1)
  const convertedMaxTemp = (climate?.temp_max - 273.15).toFixed(1)
  const wind = `${weather?.wind?.speed.toFixed(0)} m/s`
  const convertedPressure = `${(climate?.pressure / 10).toFixed(0)} kPa`
  const justifyButton = weather ? 'flex-start' : 'center'

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ImageBackground source={changeBackground(weather?.timezone)} style={styles.background} 
          imageStyle={styles.imageBackground}>
          { weather &&
            <View>
              <Text style={styles.cityText}>{weather?.name}</Text>
              <View style={styles.tempWrapper}>
                <Text style={styles.tempText}>{`${convertedTemp}º`}</Text>
              </View>
              <View style={styles.mainContent}>
                <View style={styles.contentGroupCircular}>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Min. Temp.</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{convertedMinTemp}</Text>
                      <Icon name='temperature-celsius' size={14} color='brown' />
                    </View>
                  </View>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Max. Temp.</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{convertedMaxTemp}</Text>
                      <Icon name='temperature-celsius' size={14} color='brown' />
                    </View>
                  </View>
                </View>
                <View style={styles.contentGroup}>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Feels like</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{convertedFeels}</Text>
                      <Icon name='temperature-celsius' size={14} color='brown' />
                    </View>
                  </View>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Pressure</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{convertedPressure}</Text>
                      <IconFA5 name='arrow-down' size={14} color='brown' 
                        style={{ marginLeft: 3 }} />
                    </View>
                  </View>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Wind</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{wind}</Text>
                      <IconFA5 name='wind' size={14} color='brown' 
                        style={{ marginLeft: 3 }} />
                    </View>
                  </View>
                  <View style={styles.weatherItem}>
                    <Text style={styles.weatherText}>Humidity</Text>
                    <View style={styles.weatherValueWrapper}>
                      <Text style={styles.weatherValue}>{`${climate?.humidity}%`}</Text>
                      <Icon name='water' size={14} color='brown' />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
          <View style={{ alignItems: 'center', justifyContent: justifyButton, height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={requestLocationPermission}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
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
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    marginTop: '1%',
  },
  imageBackground: {
    borderRadius: 10, 
    borderBottomLeftRadius: 36, 
    borderBottomRightRadius: 36
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
    color: 'brown',
    fontFamily: 'Quantico-Bold'
  },
  text: {
    color: 'brown',
    marginBottom: 20,
  },
  tempText: {
    fontSize: 65,
    color: '#F0FFF0',
    fontFamily: 'Calistoga-Regular'
  },
  cityText: {
    position: 'absolute',
    fontSize: 28,
    fontFamily: 'IrishGrover-Regular',
    color: '#F0FFF0',
    marginTop: '12%',
    marginLeft: '5%',
  },
  tempWrapper: {
    position: 'absolute',
    flexDirection: 'row', 
    left: '47%',
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
    borderWidth: 1.5,
    borderColor: 'brown',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  weatherItem: {
    flexDirection: 'column',
  },
  weatherText: {
    color: 'brown', 
    fontSize: 14,
    fontFamily: 'Quantico-Bold'
  },
  weatherValueWrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  weatherValue: {
    alignSelf: 'center', 
    color: 'brown', 
    fontFamily: 'Quantico-Regular'
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center', 
    height: '90%', 
    width: '95%', 
    alignSelf: 'center'
  },
  contentGroupCircular: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'brown',
    padding: 10,
    marginBottom: 10,
    width: '70%',
    backgroundColor: 'white',
    opacity: 0.8,
  }
})
 
export default App
