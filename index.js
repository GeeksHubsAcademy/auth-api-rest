const express = require('express');
const app = express();
// const app = require('express')();
const port = +process.argv[2] || 3000;


// body parse to json
app.use(express.json());


app.get('/hola', (request, response) => {
    console.log('alguien hecho una petición Get a /hola');
    let miResponse = { code: 200, data: 'Adios mundo cruel'};
    response.json( miResponse );
})



app.post('/register', (req,res) => {

    console.log(req.body);
    res.status(201).json({data:'created!'});

} );


app.listen(port , () => console.log('servidor escuchando en el puerto ' + port));