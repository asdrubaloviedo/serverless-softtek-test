const crypto = require('crypto');
const aws = require('aws-sdk');
const { formatResponse } = require('../../../utils/formatResponse');
const { createPerson } = require('../../../utils/personService');

const save = async (event, context) => {
  const pk = crypto.randomBytes(20).toString('hex');
  const body = JSON.parse(event.body);
  body.pk = pk;
  const res = await createPerson(body);
  if (!res) return formatResponse(403, { error: `There was an error inserting ID of ${data.ID} in table ${TableName}` });
  return formatResponse(200, body);
};

module.exports = {
  save
};