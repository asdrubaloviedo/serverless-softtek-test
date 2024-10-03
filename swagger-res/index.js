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

  // Log the API ID and stage for debugging
  console.log('API ID:', apiId);
  console.log('Stage:', stage);

  const params = {
    exportType: 'swagger',
    restApiId: apiId,
    stageName: stage,
    accepts: 'application/json'
  };

  try {
    const command = new GetExportCommand(params);
    const getExportPromise = await apigateway.send(command);

    // Log the raw response body and its type for debugging
    console.log('Raw response:', getExportPromise.body);
    console.log('Response type:', typeof getExportPromise.body);

    // Convert Uint8Array to string
    const responseBody = new TextDecoder('utf-8').decode(getExportPromise.body);

    let swaggerJson;
    try {
      // Attempt to parse the JSON response
      swaggerJson = JSON.parse(responseBody);
    } catch (jsonError) {
      console.error('Failed to parse JSON:', jsonError);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Invalid JSON response from API Gateway'
        })
      };
    }

    // Remove unwanted paths from Swagger JSON
    delete swaggerJson.paths['/api-docs/{proxy+}'];
    delete swaggerJson.paths['/api-docs'];

    // Serve the Swagger UI with the valid Swagger JSON
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
