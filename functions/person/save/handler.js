const crypto = require('crypto');
const { formatResponse } = require('../../../utils/formatResponse');
const { createPerson } = require('../../../utils/personService');

const save = async (event, context) => {
  const pk = crypto.randomBytes(20).toString('hex');

  let body;
  try {
    body = JSON.parse(event.body);

    // Convertir peso a number si existe y es un string
    if (body.peso) {
      body.peso = Number(body.peso);
    }
  } catch (error) {
    return formatResponse(400, { error: 'Invalid request body' });
  }

  body.pk = pk;

  try {
    const res = await createPerson(body);
    return formatResponse(200, { ...res, pk });
  } catch (error) {
    return formatResponse(403, {
      error: `There was an error inserting ID of ${pk} in table SofttekTable`
    });
  }
};

module.exports = {
  save
};
