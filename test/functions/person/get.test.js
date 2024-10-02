const { save } = require('../../../functions/person/save/handler');
const { get } = require('../../../functions/person/get/handler');
const { PERSON_SEARCH } = require('../../fixtures/personSearch');
jest.mock('axios', () => ({
  get: jest.fn()
}));

const axios = require('axios');
const { json } = require('stream/consumers');

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

    const { body: bodyPerson } = await get(event);
    expect(typeof bodyPerson).toBe('string');
    expect(JSON.parse(bodyPerson).pk).toBe(data.pk);

  });
});