const express = require('express')
require('./db/mongoose')
const { auth, config } = require('../config/auth')
const { requiresAuth } = require('express-openid-connect');
const userRouter = require('./routers/user')
const gameRouter = require('./routers/game')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(gameRouter)

module.exports = app