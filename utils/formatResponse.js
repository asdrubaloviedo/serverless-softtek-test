const formatResponse = (statusCode, body) => {
  console.log('formatResponse', statusCode, body);
  return {
    statusCode,
    body: JSON.stringify(body)
  };
};

module.exports = {
  formatResponse
};