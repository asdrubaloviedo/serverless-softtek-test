'use strict';
const axios = require('axios');
const { formatResponse } = require('../../../utils/formatResponse');

const dataMapping = (data) => {
  const mapping = {
    name: 'nombre',
    gender: 'genero',
    birth_year: 'fecha_nacimiento',
    mass: 'peso'
  };
  const mappedData = {};

  for (const key in mapping) {
    if (data[key]) {
      mappedData[mapping[key]] = data[key];
    } else {
      mappedData[mapping[key]] = 'N/A';
    }
  }

  return mappedData;
};

const search = async (event, context) => {
  if (!event.queryStringParameters || !event.queryStringParameters.search) {
    return formatResponse(400, { error: 'Missing search parameter' });
  }

  const { search } = event.queryStringParameters;

  try {
    const { data, status } = await axios.get(
      `https://swapi.py4e.com/api/people/?search=${search}`
    );

    if (status !== 200) {
      return formatResponse(status, { error: 'There is an error with axios' });
    }

    const result = data.results.map(dataMapping);
    return formatResponse(200, result);
  } catch (error) {
    return formatResponse(500, { error: 'There is an error with axios' });
  }
};

module.exports = {
  search
};
