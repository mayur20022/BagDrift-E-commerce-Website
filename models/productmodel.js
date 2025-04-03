const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    image: Buffer,
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
})

module.exports = mongoose.model("Products", productSchema)