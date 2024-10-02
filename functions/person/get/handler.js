const { formatResponse } = require('../../../utils/formatResponse');
const { getPersonById } = require('../../../utils/personService');

const get = async (event) => {
  // Asegurarse de que pathParameters esté definido y tenga un 'id'
  if (!event.pathParameters || !event.pathParameters.id) {
    return formatResponse(400, { error: 'Invalid or missing ID' });
  }

  const { id } = event.pathParameters;
  try {
    const item = await getPersonById(id);
    if (!item) return formatResponse(403, { error: 'Person not found' });
    return formatResponse(200, item);
  } catch (error) {
    console.error('Error retrieving person:', error); // Agregado para depuración
    return formatResponse(500, { error: 'Error retrieving person' });
  }
};

module.exports = {
  get
};
