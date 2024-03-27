const mongoose = require('mongoose')

const Place = new mongoose.Schema({
    title: {type: String, required: true},
    description:  {type: String, required: true},
    imageUrl:  String,
    address:  {type: String, required: true},
    location: {
      lat:  {type: Number, required: true},
      lng:  {type: Number, required: true},
    },
    creator: {type: mongoose.Types.ObjectId, required: true, ref: "Users"},
})

module.exports = mongoose.model("Places", Place)