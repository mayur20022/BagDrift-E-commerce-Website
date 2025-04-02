const express = require('express')
const app = express()
const db = require("./config/mongooseconnection")
const OwnerRoute = require("./routes/OwnerRoute")
const UsersRoute = require('./routes/UsersRoute')
const productsRoute = require('./routes/productsRoute')
const indexRoute = require("./routes/Index")
const flash = require("connect-flash")
const expressSession = require("express-session")

const cookieParser = require('cookie-parser')
const path = require('path')
require("dotenv").config()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())



app.use("/", indexRoute)
app.use("/owner", OwnerRoute)
app.use("/users", UsersRoute)
app.use("/products", productsRoute)

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/'); 
});





app.listen(3000, () => {
    console.log('Server is running on port 3000')
})