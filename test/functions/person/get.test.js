const { save } = require('../../../functions/person/save/handler');
const { get } = require('../../../functions/person/get/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
jest.mock('axios', () => ({
  get: jest.fn()
}));

// Mock de la función getPersonById
jest.mock('../../../utils/personService', () => ({
  getPersonById: jest.fn()
}));

const axios = require('axios');
const { getPersonById } = require('../../../utils/personService');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Get function', () => {
  it('should return a person with ID', async () => {
    const expectedData = {
      nombre: PERSON_SEARCH.results[0].name,
      genero: PERSON_SEARCH.results[0].gender,
      fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
      peso: PERSON_SEARCH.results[0].mass
    };

    const eventToSave = {
      body: JSON.stringify(expectedData)
    };

    const { statusCode, body } = await save(eventToSave);
    const data = JSON.parse(body);
    const event = {
      pathParameters: { id: data.pk }
    };

    // Mock de getPersonById para devolver el dato esperado
    getPersonById.mockResolvedValue({
      pk: data.pk,
      ...expectedData
    });

    const { body: bodyPerson } = await get(event);
    expect(typeof bodyPerson).toBe('string');
    expect(JSON.parse(bodyPerson).pk).toBe(data.pk);
  });

  it('should return 403 if person not found', async () => {
    // Mock de getPersonById para que devuelva null
    getPersonById.mockResolvedValue(null);

    const event = {
      pathParameters: { id: 'nonexistent-id' }
    };

    const { statusCode, body } = await get(event);

    expect(statusCode).toBe(403);
    expect(JSON.parse(body).error).toBe('Person not found');
  });

  it('should return 400 for invalid ID format', async () => {
    const event = {
      pathParameters: { id: null }
    };

    const { statusCode, body } = await get(event);

    expect(statusCode).toBe(400);
    expect(JSON.parse(body).error).toBe('Invalid or missing ID');
  });

  it('should return 400 for missing pathParameters', async () => {
    const event = {};

    const { statusCode, body } = await get(event);

    expect(statusCode).toBe(400);
    expect(JSON.parse(body).error).toBe('Invalid or missing ID');
  });
});
