import Settings from './Settings'

const fetchWeatherData = async (lat, lon) => {
  const api = Settings.WEATHER_MAP_API
  const key = Settings.WEATHER_MAP_KEY

  return fetch(`${api}lat=${lat}&lon=${lon}&appid=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
  })
}

export default {
  fetchWeatherData,
}