const fs = require( 'fs' );

module.exports = ( req, res ) => {
    // get text from file
    const dataString = fs.readFileSync( './db.json', 'UTF-8' );
    // parse json string to object
    const data = JSON.parse( dataString );

    const {  email, password } = req.body;

    const hasInvalidBody = !( email && password );

    if (hasInvalidBody) {
        res.status(400).json({message:'Necesito un email y un password'})
    } else {
       const userFound =  data.users.find( user => user.password === password && user.email === email  )
        if (!userFound ) {
            res.status(401).json({message: 'email o contraseña invalido'})

        } else {
            res.status(200).json({message: 'Bienvenido al castillo ' + userFound.username})
        }
    }
}
