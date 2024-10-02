const { save } = require('../../../functions/person/save/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
jest.mock('axios', () => ({
  get: jest.fn()
}));

const axios = require('axios');

describe('Save function', () => {
  it('should return data when status is 200', async () => {
    const expectedData = {
      nombre: PERSON_SEARCH.results[0].name,
      genero: PERSON_SEARCH.results[0].gender,
      fecha_nacimiento: PERSON_SEARCH.results[0].birth_year,
      peso: PERSON_SEARCH.results[0].mass
    };

    const event = {
      body: JSON.stringify(expectedData)
    };

    const { statusCode, body } = await save(event);
    const data = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(data.nombre).toBe(PERSON_SEARCH.results[0].name);
    expect(data.genero).toBe(PERSON_SEARCH.results[0].gender);
    expect(data.fecha_nacimiento).toBe(PERSON_SEARCH.results[0].birth_year);
    expect(data.peso).toBe(PERSON_SEARCH.results[0].mass);
  });
});