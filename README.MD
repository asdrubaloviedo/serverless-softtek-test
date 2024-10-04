# Prueba tecnica Softtek

Este proyecto esta desarrollado para la empresa Softtek haciendo uso de serverless framework. Cuenta con las siguientes caracteristicas:
1.- Un layer con las dependencias `nodejs-layer`.
2.- Pruebas unitarias con Jest.
3.- CI/CD haciendo uso de GitHub Actions donde se ejecutan las pruebas de Jest y se ejecuta el deploy a AWS.
4.- Documentacion de Swagger.

### Requerimientos

- Crear una API en Node.js con el framework Serverless para un despliegue en AWS.
- Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
- Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints.
- Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
- Crear un endpoint GET que muestre la data almacenada.

API de prueba SWAPI: https://swapi.py4e.com/documentation

### Ejecución manual de pruebas unitarias

Este proyecto usa `jest` para realizar las pruebas, cuenta con los siguientes comandos:

- Ejecucion de pruebas unitarias

```
npm run test
```

- Ejecucion de coverage

```
npm run test:coverage
```

### Deploy manual del proyecto

```
sls deploy
```

### Visualizar swagger offline

```
sls offline start
```

Luego en el navegador ir a la ruta "http://localhost:3000/dev/swagger"

### Visualizar swagger online

En el navegador luego de hacer el deploy se nos mostrara una ruta que termina en ".../dev/swagger",
abrimos dicha ruta en el navegador

### Integracion continua + pruebas + deploy

```
git push -u origin main
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
