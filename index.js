const express = require('express');
const app = express();
const registerController = require('./controllers/register.js')

const port = +process.argv[2] || 3000


// body parse to json
app.use(express.json());


app.get('/ping', (request, response) => {
    console.log('alguien hecho una petición Get a /ping');
    let miResponse = {data: 'pong'};
    response.status(200).json( miResponse );
})



app.post('/register', registerController);


app.listen(port , () => console.log('servidor escuchando en el puerto ' + port))