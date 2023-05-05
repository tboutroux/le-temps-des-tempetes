import axios from 'axios'

export default class Api {
  token = "bb188aabfc7171dcf41d382144dc71103522a0deeeff18f7c58368d5ca0f6126"

  async search(city) {
    const url =
      'https://api.meteo-concept.com/api/location/cities?token=' +
      this.token +
      '&search=' +
      city
    return await axios.get(url).then((response) => response.data)
  }

  async getMeteoForCityFor5Days(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily?token=' +
      this.token +
      '&insee=' +
      insee

    const result = await axios.get(url).then((response) => response.data)

    return result.forecast.slice(0,6)
  }

  async getMeteoForCityForNextHour(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily/periods?token=' +
      this.token +
      '&insee=' +
      insee
    return await axios.get(url).then((response) => response.data)
  }
}
