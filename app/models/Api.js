import axios from 'axios' // Import axios

export default class Api {
  token = "84c6d048e7fadf6dd23dcef612780263fef19207a2987163f7a1ca22f5f9a4a1" // Token API

  async search(city) {
    // Renvoie une promesse avec les données de la ville
    const url =
      'https://api.meteo-concept.com/api/location/cities?token=' +
      this.token +
      '&search=' +
      city
    return await axios.get(url).then((response) => response.data) 
  }

  async getMeteoForCityFor5Days(insee) {
    // Renvoie une promesse avec les données météo de la ville
    const url =
      'https://api.meteo-concept.com/api/forecast/daily?token=' +
      this.token +
      '&insee=' +
      insee

    const result = await axios.get(url).then((response) => response.data)

    return result.forecast.slice(0,6)
  }

  async getMeteoForCityForNextHour(insee) {
    // Renvoie une promesse avec les données météo de la ville
    const url =
      'https://api.meteo-concept.com/api/forecast/daily/periods?token=' +
      this.token +
      '&insee=' +
      insee
    return await axios.get(url).then((response) => response.data)
  }
}
