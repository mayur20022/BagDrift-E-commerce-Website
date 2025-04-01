const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    image: String,
    bgcolor: String,
    panelcolor: String,
    text: String,
})

module.exports = mongoose.model("Products", productSchema)