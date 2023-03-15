const BaseRepository = require('../repository/base/baseRepository');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);

    return await this.carRepository.find(carId);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionArray(carCategory.carIds);

    return carCategory.carIds[randomCarIndex];
  }


  getRandomPositionArray(list) {
    const listLength = list.length;

    return Math.floor(
      Math.random() * (listLength),
    );
  }

}

module.exports = CarService;