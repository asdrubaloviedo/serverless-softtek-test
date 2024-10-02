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
      mappedData[key] = 'N/A';
    }
  }

  return mappedData;
};
const search = async (event, context) => {
  const { search } = event.queryStringParameters;
  const { data, status } = await axios.get(`https://swapi.py4e.com/api/people/?search=${search}`);

  if (status !== 200)
    return formatResponse(status, { error: 'There is a error with axios' });


  const result = data.results.map(dataMapping);
  return formatResponse(200, result);

};

module.exports = {
  search
};