const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const gameRouter = require('./routers/game')

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'https://werner-bg-logger-client.herokuapp.com'}))
app.use(cookieParser())
app.use(userRouter)
app.use(gameRouter)

module.exports = app