const Service = require('./src/service');
const sinon = require('sinon');
const BASE_URL1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL2 = 'https://swapi.dev/api/planets/2/';
const { deepEqual } = require('assert');
const mocks = {
    tattoine: require('./mocks/tattoine.json'),
    alderaan: require('./mocks/alderaan.json'),
  }

;(async () => {
  // {
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(BASE_URL2);
  //   console.log(JSON.stringify(withoutStub));
  // }

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL1).resolves(mocks.tattoine);
  stub.withArgs(BASE_URL2).resolves(mocks.alderaan);

  {
    const expected = {
      'name': 'Tatooine',
      'surfaceWater': '1',
      appearedIn: 5,
    };

    const result = await service.getPlanets(BASE_URL1);

    deepEqual(result, expected);
  }

  {
    const expected = {
      'name': 'Alderaan',
      'surfaceWater': '40',
      appearedIn: 2,
    };

    const result = await service.getPlanets(BASE_URL2);

    deepEqual(result, expected);
  }
})();