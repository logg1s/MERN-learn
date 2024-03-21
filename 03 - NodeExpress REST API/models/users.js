const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:  {type: String, required: true},
    email:  {type: String, required: true},
    password:  {type: String, required: true},
    image: {type: String, required: true},
    places: {type: String, required: true}
})

module.exports = mongoose.model("Users", User)