// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Softtek technical test",
    "version": "1"
  },
  "paths": {
    "/search": {
      "get": {
        "summary": "search",
        "description": "",
        "operationId": "search.get.search",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Datos formateados de una persona",
            "schema": {
              "$ref": "#/definitions/Person"
            }
          }
        }
      }
    },
    "/person": {
      "post": {
        "summary": "save",
        "description": "",
        "operationId": "save.post.person",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Person"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/person/{id}": {
      "get": {
        "summary": "getPerson",
        "description": "",
        "operationId": "getPerson.get.person/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/api-docs": {
      "get": {
        "summary": "swagger",
        "description": "",
        "operationId": "swagger.get.api-docs",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Person": {
      "properties": {
        "nombre": {
          "title": "Person.nombre",
          "type": "string"
        },
        "genero": {
          "title": "Person.genero",
          "type": "string"
        },
        "peso": {
          "title": "Person.peso",
          "type": "number"
        },
        "fecha_nacimiento": {
          "title": "Person.fecha_nacimiento",
          "type": "string"
        }
      },
      "required": [
        "nombre",
        "genero",
        "peso",
        "fecha_nacimiento"
      ],
      "additionalProperties": false,
      "title": "Person",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev"
};