const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const placeRouter = require('./routes/place-routes')

app.use('/api/places', placeRouter)

app.use((err, req, res, next) => {
    res.status(err.code).json({message: err.message})
})



app.listen(8000)