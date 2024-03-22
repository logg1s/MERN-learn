const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:  {type: String, required: true},
    email:  {type: String, required: true},
    password:  {type: String, required: true},
    image: {type: String, required: true},
    places: [{type: mongoose.Types.ObjectId, required: true, ref: "Places"}]
})

module.exports = mongoose.model("Users", User)