const {
  APIGatewayClient,
  GetExportCommand
} = require('@aws-sdk/client-api-gateway');
const express = require('express');
const serverless = require('serverless-http');
const swaggerUI = require('swagger-ui-express');

const apigateway = new APIGatewayClient({});

const app = express();

module.exports.handler = async (event, context) => {
  const apiId = event.requestContext.apiId;
  const stage = event.requestContext.stage;

  const params = {
    exportType: 'swagger',
    restApiId: apiId,
    stageName: stage,
    accepts: 'application/json'
  };

  try {
    const command = new GetExportCommand(params);
    const getExportPromise = await apigateway.send(command);

    const swaggerJson = JSON.parse(getExportPromise.body);

    delete swaggerJson.paths['/api-docs/{proxy+}'];
    delete swaggerJson.paths['/api-docs'];

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
    const handler = serverless(app);
    const ret = await handler(event, context);
    return ret;
  } catch (error) {
    console.error('Error retrieving API Gateway export:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve API documentation' })
    };
  }
};
