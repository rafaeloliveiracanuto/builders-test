import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Network from './Network'

const requestLocation = async (onSuccess = () => null) => {
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
            onSuccess(res)
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

export default {
  requestLocation
}