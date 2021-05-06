Prueba_tecnica (Front-End con React.js)

Aplicativo web de prueba, consumiendo la API "bacon ipsum", desplegando un texto autogenerado y realizando el calculo de las 3 palabras más frecuentes en el texto adquirido, desplegando dichos resultados a travez de un gráfico de barras.

<!> Al ser una aplicación React, es necesario tener instalado Node.js en el equipo para poder ejecutarla (lo puedes encontrar aquí: https://nodejs.org/en/ es preferible descargar la versión LTS) <!>

Para correr el aplicativo (versión de desarrollo, sin optimizar):
- Navega hasta el directorio "prototype1" del proyecto desde una terminal (ej. CMD de windows).
- Ejecuta el comando "npm start" para iniciar la versión de desarrollo del aplicativo (es una build no optimizada del aplicativo, pero te permitirá ver en tiempo real los cambios que se realicen al código).

Si deseas ejecutar una build optimizada del aplicativo (versión de producción):
- Desde una terminal y estando en el directorio "prototype1" ejecuta "npm run build" para compilar una build de producción (será necesario cada vez que cambies el codigo del aplicativo).
- Ejecuta el comando "npm install -g serve" para instalar un server estático para hostear el aplicativo (solo será necesario la primera vez).
- Ejecuta el comando "serve -s build" para hostear la build compilada.
- Podrás ver el aplicativo ingresando la ruta "http://localhost:5000" en tu navegador favorito (recomandado Google Chrome).
