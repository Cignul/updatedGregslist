import CarService from "./CarService.js";

let carService = new CarService()

function drawCars(cars) {
  let template = ''
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    template += `
    <div style="outline: 1px solid black" class="col-3">
        <p>Make: ${car.make}</p>
        <p>${car.model}</p>
        <p>${car.price}</p>
        <p>${car.year}</p>
        <p>${car.description}</p>
        <img src="${car.imgUrl}" alt="car image">
        <button onclick="app.controllers.carController.deleteCar('${car._id}')">DELETE</button>
        <button onclick="app.controllers.carController.bid('${car._id}', ${car.price})">BID</button>
    </div></div>
    `
  }

  document.getElementById('cars').innerHTML = template


}

export default class CarController {

  constructor() {
    carService.getCars(drawCars)
  }

  addCar(e) {
    e.preventDefault();
    let formData = e.target
    carService.addCar(formData, drawCars)
    formData.reset()
  }
  deleteCar(carId) {
    carService.deleteCar(carId, drawCars)
  }
  bid(carId, price) {
    price += 100
    let update = {
      price: price
    }
    carService.bid(carId, update, drawCars)



  }
}