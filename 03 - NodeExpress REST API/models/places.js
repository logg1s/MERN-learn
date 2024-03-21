const mongoose = require('mongoose')

const Place = new mongoose.Schema({
    title: {type: String, required: true},
    description:  {type: String, required: true},
    imageUrl:  {type: String, required: true},
    address:  {type: String, required: true},
    location: {
      lat:  {type: Number, required: true},
      lng:  {type: Number, required: true},
    },
    creator: {type: String, required: true},
})

module.exports = mongoose.model("Places", Place)