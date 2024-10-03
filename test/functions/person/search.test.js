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
    const expectedData = [
      {
        nombre: PERSON_SEARCH.results[0].name,
        genero: PERSON_SEARCH.results[0].gender,
        fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
        peso: PERSON_SEARCH.results[0].mass
      }
    ];

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

  it('should return an empty array when no results are found', async () => {
    const event = {
      queryStringParameters: {
        search: 'unknown'
      }
    };

    const mockResponse = {
      data: { results: [] },
      status: 200
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify([]));
  });

  it('should return 500 when axios throws an error', async () => {
    const event = {
      queryStringParameters: {
        search: 'Luke'
      }
    };

    axios.get.mockRejectedValue(new Error('Network error'));

    const response = await search(event);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(
      JSON.stringify({ error: 'There is an error with axios' })
    );
  });

  it('should return 400 when query parameters are missing', async () => {
    const event = {
      queryStringParameters: {}
    };

    const response = await search(event);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      JSON.stringify({ error: 'Missing search parameter' })
    );
  });

  it('should return N/A for missing or null values in response data', async () => {
    const event = {
      queryStringParameters: {
        search: 'Luke'
      }
    };

    const mockResponse = {
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            gender: null,
            birth_year: '19BBY',
            mass: null
          }
        ]
      },
      status: 200
    };

    const expectedData = [
      {
        nombre: 'Luke Skywalker',
        genero: 'N/A',
        fecha_nacimiento: '19BBY',
        peso: 'N/A'
      }
    ];

    axios.get.mockResolvedValue(mockResponse);

    const response = await search(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(expectedData));
  });

  it('should return 400 if queryStringParameters is undefined', async () => {
    const event = {};

    const response = await search(event);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      JSON.stringify({ error: 'Missing search parameter' })
    );
  });
});
