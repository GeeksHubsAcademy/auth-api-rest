const express = require('express');
const app = express();
const fs = require('fs');
const id = require( 'uniqid' );
var validator = require( 'validator' );

// const app = require('express')();
const port = +process.argv[2] || 3000;


// body parse to json
app.use(express.json());


app.get('/ping', (request, response) => {
    console.log('alguien hecho una petición Get a /ping');
    let miResponse = {data: 'pong'};
    response.status(200).json( miResponse );
})



app.post('/register', (req,res) => {
    let {username, email, password} = req.body;

    if (username && email && password) {

        if (password.length < 8) {
            res.status(400).json({message:'El password debe ser tener al menos 8 caracteres'})
            return;
        }
        try {
            // get text from file
            const dataString = fs.readFileSync( './db.json', 'UTF-8' );
            // parse json string to object
            var data = JSON.parse( dataString );

        } catch (error) {
             res.status( 500 ).json( { message: 'Upss, algo ha ido mal. Perdón a sido mi culpa. Inténtelo de nuevo más tarde' } )
             return;
        }

        if (data.users.find(user => user.username === username)) {
            res.status( 400 ).json( { message: 'El nombre de usuario ya existe, elija otro' } )
            return;
        }

         if ( data.users.find( user => user.email === email ) ) {
             res.status( 400 ).json( { message: 'Ya existe un usuario con ese email. Puede logearse' } )
             return;
         }

         if ( !validator.isEmail( email ) ) {
             res.status( 400 ).json( { message: 'El email no es un email. Escríbalo bien melón' } )
             return;
         }

         const newUser = {
             id: id(),
             username,
             email,
             password
         }

         //  update object
         data.users.push( newUser );
         // transform object to string
         const outputString = JSON.stringify( data )
         // write string to file
         fs.writeFileSync( './db.json', outputString )

         // response
         res.status( 201 ).json( { data: 'created!' } );


    } else {
        res.status(400).json({message: 'necesitamos un body con las propiedades username, email y password'})
    }



} );


app.listen(port , () => console.log('servidor escuchando en el puerto ' + port))