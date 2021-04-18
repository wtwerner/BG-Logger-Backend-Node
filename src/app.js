const express = require('express')
require('./db/mongoose')
// const userRouter = require('./routers/user')
// const gameRouter = require('./routers/game')

const app = express()

app.use(express.json())
// app.use(userRouter)
// app.use(gameRouter)

module.exports = app