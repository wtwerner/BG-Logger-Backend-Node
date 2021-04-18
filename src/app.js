const express = require('express')
require('./db/mongoose')
const { auth, config } = require('../config/auth')
const { requiresAuth } = require('express-openid-connect');
// const userRouter = require('./routers/user')
// const gameRouter = require('./routers/game')

const app = express()

app.use(express.json())

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config))

// app.use(userRouter)
// app.use(gameRouter)

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

module.exports = app