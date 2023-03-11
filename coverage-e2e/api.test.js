const { it, describe } = require('mocha');
const { deepStrictEqual } = require('assert');
const request = require('supertest');
const app = require('./api');

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200);

      deepStrictEqual(response.text, 'contact us page');
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200);

      deepStrictEqual(response.text, 'hello world');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'david', password: '1234' })
        .expect(200);

      deepStrictEqual(response.text, 'logging has succeeded');
    });

    it('should unauthorized a request when requesting it using wrong credentials and return HTTP status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'test', password: 'test' })
        .expect(401);

      console.log('response', response.unauthorized);

      deepStrictEqual(response.text, 'logging failed');
    });
  });

});