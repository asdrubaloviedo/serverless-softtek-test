const crypto = require('crypto');
const { formatResponse } = require('../../../utils/formatResponse');
const { createPerson } = require('../../../utils/personService');

const save = async (event, context) => {
  const pk = crypto.randomBytes(20).toString('hex');

  let body;
  console.log('event.body: ', event.body);
  try {
    body = JSON.parse(event.body);

    // Convertir peso a number si existe y es un string
    if (body.peso) {
      body.peso = Number(body.peso);
    }
  } catch (error) {
    console.error('Invalid JSON:', error);
    return formatResponse(400, { error: 'Invalid request body' });
  }

  body.pk = pk;
  console.log('body: ', body);

  try {
    const res = await createPerson(body);
    return formatResponse(200, { ...res, pk });
  } catch (error) {
    console.error('Error inserting person:', error);
    return formatResponse(403, {
      error: `There was an error inserting ID of ${pk} in table SofttekTable`
    });
  }
};

module.exports = {
  save
};
