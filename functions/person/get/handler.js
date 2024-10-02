const aws = require('aws-sdk');
const { formatResponse } = require('../../../utils/formatResponse');
const { getPersonById } = require('../../../utils/personService');

const get = async (event) => {
  const { id } = event.pathParameters;
  const item = await getPersonById(id);
  if (!item) return formatResponse(403, { error: "Person not found" });
  return formatResponse(200, item);

};

module.exports = {
  get
};