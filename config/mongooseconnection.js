const mongoose = require('mongoose')
require('dotenv').config()
const dbgr = require('debug')("development:mongoose")



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bagdrift")
    .then(() => {
        dbgr("Connected to MongoDB")
    })
    .catch(err => { 
        dbgr("Error connecting to MongoDB", err)
    })


module.exports = mongoose.connection;