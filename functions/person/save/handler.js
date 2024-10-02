const crypto = require('crypto');
const { formatResponse } = require('../../../utils/formatResponse');
const { createPerson } = require('../../../utils/personService');

const save = async (event, context) => {
  const pk = crypto.randomBytes(20).toString('hex');
  const body = JSON.parse(event.body);
  body.pk = pk;

  try {
    const res = await createPerson(body);
    return formatResponse(200, body);
  } catch (error) {
    console.error('Error inserting person:', error); // Agregado para depuración
    return formatResponse(403, {
      error: `There was an error inserting ID of ${pk} in table SofttekTable`
    });
  }
};

module.exports = {
  save
};
