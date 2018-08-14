import House from '../../models/House.js'

const housesApi = axios.create({
  //base connection u
  baseURL: 'https://bcw-gregslist.herokuapp.com/api/houses',
  //only wait 3 seconds for response
  timeout: 3000
})

export default class HouseService {
  constructor() {

  }
  getHouses(draw) {
    housesApi.get()
      .then(res => {

        let houses = res.data.data.map(rawHouse => {
          return new House(rawHouse)
        })
        draw(houses)
      })
  }
  addHouse(formData, draw) {

    let newHouse = new House({

      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      imgUrl: formData.imgUrl.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
    })
    housesApi.post('', newHouse)
      .then(res => {
        this.getHouses(draw)
        console.log(res.data)
      })
  }
  deleteHouse(houseId, draw) {
    housesApi.delete(houseId)
      .then(res => {
        this.getHouses(draw)
      })
  }
  bid(houseId, update, draw) {
    housesApi.put(houseId, update)
      .then(res => {
        console.log(res)
        this.getHouses(draw)
      })
  }


}




