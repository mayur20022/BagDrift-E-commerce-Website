const express = require('express')
const app = express()
const db = require("./config/mongooseconnection")
const OwnerRoute = require("./routes/OwnerRoute")
const UsersRoute = require('./routes/UsersRoute')
const productsRoute = require('./routes/productsRoute')

const cookieParser = require('cookie-parser')
const path = require('path')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

app.use("/owner", OwnerRoute)
app.use("/users", UsersRoute)
app.use("/products", productsRoute)






app.listen(3000, () => {
    console.log('Server is running on port 3000')
})