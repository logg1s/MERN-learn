const express = require('express')
const mongoose = require('mongoose')

const HttpError = require('./models/http-error')

const bodyParser = require('body-parser')

const app = express()

const placeRouter = require('./routes/place-routes')

const userRouter = require('./routes/users-routes')

app.use(bodyParser.json())

app.use('/api/places', placeRouter)

app.use('/api/users', userRouter)

app.use(() => {
    throw new HttpError("Could not find resource.", 404)
})

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({message: err.message || "An error"})
})


mongoose.connect("mongodb+srv://lrng159:lrng159@cluster0.pvbymxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    dbName: "mern_learn"
}).then(() => {
    app.listen(8000)
}).catch(err => {
    console.log(err)
})
