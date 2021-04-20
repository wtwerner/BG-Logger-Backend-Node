// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

//         if (!user) {
//             throw new Error()
//         }

//         req.token = token
//         req.user = user
//         next()
//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate' })
//     }
// }

// module.exports = auth

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const auth = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://wtwerner.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://werner-bg-logger-api.herokuapp.com/',
  issuer: [`https://wtwerner.us.auth0.com/`],
  algorithms: ['RS256']
});

module.exports = { auth }