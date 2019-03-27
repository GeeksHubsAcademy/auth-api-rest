const fs = require( 'fs' );
const id = require( 'uniqid' );
const validator = require( 'validator' );

module.exports = ( req, res ) => {
    // get text from file
    const dataString = fs.readFileSync( './db.json', 'UTF-8' );
    // parse json string to object
    const data = JSON.parse( dataString );

    const { username, email, password } = req.body;

    const hasInvalidBody = !( username && email && password )
    const hasinValidPassword = password.length < 8;
    const usernameExists = !!data.users.find( user => user.username === username )
    const emailExists = !!data.users.find( user => user.email === email );
    const isNotValidEmail = !validator.isEmail( email );

    switch ( true ) {
    case hasInvalidBody:
        res.status( 400 ).json( { message: 'necesitamos un body con las propiedades username, email y password' } )
        return;
    case hasinValidPassword:
        res.status( 400 ).json( { message: 'El password debe ser tener al menos 8 caracteres' } )
        return;
    case usernameExists:
        res.status( 400 ).json( { message: 'Ya existe un usuario con ese email. Puede logearse' } )
        return;
    case emailExists:
        res.status( 400 ).json( { message: 'Ya existe un usuario con ese email. Puede logearse' } )
        return;
    case isNotValidEmail:
        res.status( 400 ).json( { message: 'El email no es un email. Escríbalo bien melón' } )
        return;
    default:
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
    }

}
