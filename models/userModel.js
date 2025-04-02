const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    cart: Array,
    password: String,
    orders: Array,
    contact: Number,
    picture: String,
})

module.exports = mongoose.model("Users", userSchema)