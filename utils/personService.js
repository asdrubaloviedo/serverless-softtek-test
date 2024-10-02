const aws = require('aws-sdk');
const personTable = 'SofttekTable';

let dynamoDbClient = null;

const connect = () => {
  if (!dynamoDbClient) {
    const isTest = process.env.JEST_WORKER_ID;
    const config = {
      convertEmptyValues: true,
      ...(isTest && {
        endpoint: 'http://localhost:8000',
        sslEnabled: false,
        region: 'local-env',
      }),
    };
    dynamoDbClient = new aws.DynamoDB.DocumentClient(config);
  }
  return dynamoDbClient;
};


const getPersonById = async (personId) => {
  const dynamodb = connect();
  const params = {
    TableName: personTable,
    Key: {
      pk: personId,
    },
  };

  const { Item: item } = await dynamodb.get(params).promise();
  if (!item) throw new Error('Error saving person');
  return item;


};

const createPerson = async (body) => {
  const dynamodb = connect();
  var params = {
    TableName: personTable,
    Item: body
  };
  return await dynamodb.put(params).promise();
};

module.exports = {
  getPersonById,
  createPerson
};