const { save } = require('../../../functions/person/save/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
const { createPerson } = require('../../../utils/personService');
jest.mock('axios', () => ({
  get: jest.fn()
}));

jest.mock('../../../utils/personService');

describe('Save function', () => {
  it('should return data when status is 200', async () => {
    const expectedData = {
      nombre: PERSON_SEARCH.results[0].name,
      genero: PERSON_SEARCH.results[0].gender,
      fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
      peso: Number(PERSON_SEARCH.results[0].mass)
    };

    const event = {
      body: JSON.stringify(expectedData)
    };

    createPerson.mockResolvedValue(expectedData);

    const { statusCode, body } = await save(event);
    const data = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(data.nombre).toBe(PERSON_SEARCH.results[0].name);
    expect(data.genero).toBe(PERSON_SEARCH.results[0].gender);
    expect(data.fecha_nacimiento).toBe(PERSON_SEARCH.results[0].birth_year);
    expect(data.peso).toBe(Number(PERSON_SEARCH.results[0].mass)); // Verifica que sea un número
  });

  it('should return a 403 error when createPerson fails', async () => {
    const expectedData = {
      nombre: 'Luke Skywalker',
      genero: 'male',
      fecha_nacimiento: '19BBY',
      peso: 77
    };

    const event = {
      body: JSON.stringify(expectedData)
    };

    createPerson.mockRejectedValue(new Error('DynamoDB error'));

    const { statusCode, body } = await save(event);
    const data = JSON.parse(body);
    expect(statusCode).toBe(403);
    expect(data.error).toContain('There was an error inserting ID of');
  });

  it('should return a 400 error if the body is invalid JSON', async () => {
    const event = {
      body: 'invalid JSON'
    };

    const { statusCode, body } = await save(event);
    const data = JSON.parse(body);
    expect(statusCode).toBe(400);
    expect(data.error).toBe('Invalid request body');
  });
});
