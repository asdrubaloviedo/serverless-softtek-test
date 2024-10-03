const {
  APIGatewayClient,
  GetExportCommand
} = require('@aws-sdk/client-api-gateway');
const express = require('express');
const serverless = require('serverless-http');
const swaggerUI = require('swagger-ui-express');
const { TextDecoder } = require('util'); // Agregado para decodificar el Uint8Array

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

    // Log the raw response body for debugging
    console.log('Raw response:', getExportPromise.body);
    console.log('Response type:', typeof getExportPromise.body);

    // Convert Uint8Array to string
    const responseBody = new TextDecoder('utf-8').decode(getExportPromise.body);

    // Ahora intenta parsear la respuesta JSON
    let swaggerJson;
    try {
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

    // Eliminar rutas no deseadas de Swagger JSON
    delete swaggerJson.paths['/api-docs/{proxy+}'];
    delete swaggerJson.paths['/api-docs'];

    // Sirve Swagger UI con el JSON válido de Swagger
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
