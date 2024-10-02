const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} = require('@aws-sdk/lib-dynamodb');

const personTable = 'SofttekTable';

let dynamoDbClient = null;

const connect = () => {
  if (!dynamoDbClient) {
    const isTest = process.env.JEST_WORKER_ID;
    const config = {
      region: 'us-east-1',
      ...(isTest && {
        endpoint: 'http://localhost:8000',
        sslEnabled: false
      })
    };
    dynamoDbClient = new DynamoDBClient(config);
  }
  return DynamoDBDocumentClient.from(dynamoDbClient);
};

const getPersonById = async (personId) => {
  const dynamodb = connect();
  const command = new GetCommand({
    TableName: personTable,
    Key: { pk: personId }
  });

  const { Item: item } = await dynamodb.send(command);
  if (!item) return null;
  return item;
};

const createPerson = async (body) => {
  const dynamodb = connect();
  const command = new PutCommand({
    TableName: personTable,
    Item: body
  });
  await dynamodb.send(command);
};

module.exports = {
  getPersonById,
  createPerson
};
