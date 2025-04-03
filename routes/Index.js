const express = require('express')
const isLoggin = require('../middlewares/isLoggin')
const router = express.Router()
const Products = require("../models/productmodel")

router.get('/', (req, res) => {
    let error = req.flash("error")
    res.render('index', { error, loggedin: false })
})

router.get("/cart", isLoggin, (req, res) => {
    res.render("cart")
})
router.get("/shop", isLoggin, async (req, res) => {
    let products = await Products.find()
    res.render("shop", { products })
})

module.exports = router;