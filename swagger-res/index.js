const {
  APIGatewayClient,
  GetExportCommand
} = require('@aws-sdk/client-api-gateway');
const express = require('express');
const serverless = require('serverless-http');
const swaggerUI = require('swagger-ui-express');
const { TextDecoder } = require('util');

const apigateway = new APIGatewayClient({});
const app = express();

// Endpoint para servir la documentación Swagger
app.get('/api-docs', async (req, res) => {
  const apiId = req.context.apiId; // Asegúrate de que estás obteniendo el apiId correctamente
  const stage = req.context.stage; // Asegúrate de que estás obteniendo el stage correctamente

  const params = {
    exportType: 'swagger',
    restApiId: apiId,
    stageName: stage,
    accepts: 'application/json'
  };

  try {
    const command = new GetExportCommand(params);
    const getExportPromise = await apigateway.send(command);
    const responseBody = new TextDecoder('utf-8').decode(getExportPromise.body);

    let swaggerJson;
    try {
      swaggerJson = JSON.parse(responseBody);
    } catch (jsonError) {
      console.error('Failed to parse JSON:', jsonError);
      return res
        .status(500)
        .json({ error: 'Invalid JSON response from API Gateway' });
    }

    // Eliminar las rutas que no son necesarias
    delete swaggerJson.paths['/api-docs/{proxy+}'];
    delete swaggerJson.paths['/api-docs'];

    // Sirve Swagger UI
    app.use('/api-docs/ui', swaggerUI.serve, swaggerUI.setup(swaggerJson));
    res.redirect('/api-docs/ui'); // Redirige a la UI de Swagger
  } catch (error) {
    console.error('Error retrieving API Gateway export:', error);
    return res
      .status(500)
      .json({ error: 'Failed to retrieve API documentation' });
  }
});

module.exports.handler = serverless(app);
