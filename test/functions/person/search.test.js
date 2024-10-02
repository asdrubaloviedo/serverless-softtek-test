const { search } = require('../../../functions/person/search/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
jest.mock('axios', () => ({
  get: jest.fn()
}));

const axios = require('axios');

describe('search function', () => {
  it('should return data when status is 200', async () => {
    const event = {
      queryStringParameters: {
        search: 'Luke'
      }
    };
    const expectedData = [{
      nombre: PERSON_SEARCH.results[0].name,
      genero: PERSON_SEARCH.results[0].gender,
      fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
      peso: PERSON_SEARCH.results[0].mass
    }];

    const mockResponse = {
      data: PERSON_SEARCH,
      status: 200
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(expectedData));
  });

  it('should return only status code when status is not 200', async () => {
    const event = {
      queryStringParameters: {
        search: 'invalid'
      }
    };

    const mockResponse = {
      status: 404
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);

    expect(response.statusCode).toBe(404);
  });
});