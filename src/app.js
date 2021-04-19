const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const gameRouter = require('./routers/game')

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(gameRouter)

module.exports = app