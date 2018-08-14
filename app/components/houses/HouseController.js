import HouseService from "./HouseService.js"

let houseService = new HouseService()

function drawHouse(houses) {
  let template = ''
  for (let i = 0; i < houses.length; i++) {
    const house = houses[i];
    template += `
    <div style="outline: 1px solid black" class="col-3">
    <p>Make: ${house.bedrooms}</p>
    <p>${house.bathrooms}</p>
    <p>${house.imgUrl}</p>
    <p>${house.levels}</p>
    <p>${house.year}</p>
    <p>${house.price}</p>
    <img src="${house.imgUrl}" alt="house image">
    <button onclick="app.controllers.houseController.deleteHouse('${house._id}')">DELETE</button>
    <button onclick="app.controllers.houseController.bid('${house._id}', ${house.price})">BID</button>
</div>
`}
  document.getElementById('houses').innerHTML = template
}
export default class HouseController {

  constructor() {
    houseService.getHouses(drawHouse)
  }

  addHouse(e) {
    e.preventDefault();
    let formData = e.target
    houseService.addHouse(formData, drawHouse)
    formData.reset()
  }
  deleteHouse(houseId) {
    houseService.deleteHouse(houseId, drawHouse)
  }
  bid(houseId, price) {
    price += 100
    let update = {
      price: price
    }
    houseService.bid(houseId, update, drawHouse)



  }
}


