const express = require('express');
const app = express();
// const app = require('express')();

app.get('/hola', (request, response) => {

    response.send('Adios mundo cruel!')

    console.log('alguien hecho una petición Get a /hola')
})


app.listen(3000)