const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const HttpError = require('./models/http-error')
const bodyParser = require('body-parser')
const app = express()
const placeRouter = require('./routes/place-routes')
const userRouter = require('./routes/users-routes')

app.use('/uploads/images', express.static(path.join('uploads', 'images')))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next()
})
app.use('/api/users', userRouter)
app.use('/api/places', placeRouter)
app.use(() => {
    throw new HttpError("Could not find resource.", 404)
})
app.use((err, req, res, next) => {
    if(req.file) {
        fs.unlink(req.file.path, () => {
        })
    }
    res.status(err.code || 500).json({message: err.message || "An error"})
})


mongoose.connect("mongodb+srv://lrng159:lrng159@cluster0.pvbymxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    dbName: "mern_learn"
}).then(() => {
    app.listen(8000)
    console.log("MongoDB connected")
    console.log("==================================")
}).catch(err => {
    console.error("Connect mongoDB: " + err)
})
