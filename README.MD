# Prueba tecnica Softtek

Este proyecto esta desarrollado usando serverless framework, cuenta con un layer con las dependencias `nodejs-layer` este layer esta configurado en el `serverless.yml` y se sube automaticamente al hacer deploy.

### Requerimientos

- Crear una API en Node.js con el framework Serverless para un despliegue en AWS.
- Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
- Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints.
- Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
- Crear un endpoint GET que muestre la data almacenada.

API de prueba SWAPI: https://swapi.py4e.com/documentation

### Ejecución de pruebas unitarias

El proyecto tiene configurado `jest` para ejecutar las pruebas, se dispone de los siguientes comandos:

- Para ejecutar pruebas unitarias

```
npm run test
```

- Para ejecutar el coverage

```
npm run test:coverage
```

### Hacer deploy del proyecto

```
sls deploy
```

### Visualizar swagger offline

```
sls offline start
```

### Dependencias

- aws-sdk
- axios
- crypto

### Generar layer

```
npm i --omit=dev
mkdir nodejs/
mv node_modules/ nodejs/
zip -r nodejs-layer.zip nodejs/
rm -rf nodejs/
```

##### Autor:

Asdrubal Oviedo
