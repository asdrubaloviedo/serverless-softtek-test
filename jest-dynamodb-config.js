module.exports = {
  tables: [
    {
      TableName: `SofttekTable`,
      KeySchema: [{ AttributeName: 'pk', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'pk', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      BillingMode: 'PAY_PER_REQUEST',
    },
    // etc
  ],
};