const { formatResponse } = require('../../../utils/formatResponse');
const { getPersonById } = require('../../../utils/personService');

const get = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return formatResponse(400, { error: 'Invalid or missing ID' });
  }

  const { id } = event.pathParameters;
  try {
    const item = await getPersonById(id);
    console.log('item: ', item);
    if (!item) return formatResponse(403, { error: 'Person not found' });
    return formatResponse(200, item);
  } catch (error) {
    return formatResponse(500, { error: 'Error retrieving person' });
  }
};

module.exports = {
  get
};
