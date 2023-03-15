const BaseRepository = require('../repository/base/baseRepository');
const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });

    this.taxesBasedOnAge = Tax.taxesBasedOnAge;

    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency', currency: 'BRL',
    });
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

    return Math.floor(Math.random() * (listLength));
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const price = carCategory.price;
    const { then: tax } = this.taxesBasedOnAge
      .find(tax => age >= tax.from && age <= tax.to);

    const finalPrice = ((tax * price) * (numberOfDays));
    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);

    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays);

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);

    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    const dueDate = today.toLocaleDateString('pt-br', opts);

    return new Transaction(
      {
        customer,
        car,
        amount: finalPrice,
        dueDate,
      },
    );
  }
}

module.exports = CarService;