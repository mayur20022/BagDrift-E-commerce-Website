const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    porduct: Array,
    password: String,
    picture: String,
    gstin: String
})

module.exports = mongoose.model("Owner", ownerSchema)