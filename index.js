const express = require('express');
const app = express();
// const app = require('express')();
const port = +process.argv[2] || 3000;


app.get('/hola', (request, response) => {
    console.log('alguien hecho una petición Get a /hola')
    let miResponse = { code: 200, data: 'Adios mundo cruel'}
    response.json( miResponse )
})


app.listen(port , () => console.log('servidor escuchando en el puerto ' + port))