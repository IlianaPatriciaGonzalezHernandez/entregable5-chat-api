const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const jwtSecret = require('../../config').api.jwtSecret
const {findUserById} = require('../users/users.controllers')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then((user) => {
                //es necesaria una validacion poque puede ser que el usuario no exista
                if(user) {
                    done(null, tokenDecoded) //caso exitoso porque el usuario si existe
                } else {
                    done(null, false) //caso fallido, no existe el usuario y no genera error
                }
            })
            .catch((err) => {
                done(err, false) //caso fallido en el que si genera un error
            })
    })
)

module.exports = 
    passport
