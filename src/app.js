const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const gameRouter = require('./routers/game')

const app = express()

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}

app.use(express.json())
app.use(allowCrossDomain)
app.use(cors({credentials: true, origin: 'https://werner-bg-logger-client.herokuapp.com'}))
app.use(cookieParser())
app.use(userRouter)
app.use(gameRouter)

module.exports = app