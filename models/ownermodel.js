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
})

const Owner = mongoose.model('Owner', ownerSchema, 'owners'); // 'owners' is the collection name
module.exports = Owner;
