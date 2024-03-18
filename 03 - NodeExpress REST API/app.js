const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const placeRouter = require('./routes/place-routes')

app.use(bodyParser.json())

app.use('/api/places', placeRouter)

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({message: err.message || "An error"})
})



app.listen(8000)