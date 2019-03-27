const express = require('express');
const app = express();
// const app = require('express')();
const port = +process.argv[2] || 3000;


app.get('/hola', (request, response) => {

    response.send('Adios mundo cruel!')

    console.log('alguien hecho una petición Get a /hola')
})


app.listen(port , () => console.log('servidor escuchando en el puerto ' + port))