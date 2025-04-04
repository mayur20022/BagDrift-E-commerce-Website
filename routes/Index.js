const express = require('express')
const isLoggin = require('../middlewares/isLoggin')
const router = express.Router()
const Products = require("../models/productmodel")
const User = require('../models/userModel')

router.get('/', (req, res) => {
    let error = req.flash("error")

    res.render('index', { error, loggedin: false, success })
})

router.get("/cart", isLoggin,async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).populate("cart");
    res.render("cart",{user})
})
router.get("/shop", isLoggin, async (req, res) => {

    let products = await Products.find()
    let success = req.flash("success")

    res.render("shop", { products, success })
})

router.get("/addtocart/:id", isLoggin, async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    user.cart.push(id)
    user.save()
    req.flash("success","Successfuly added")
    res.redirect("/shop")
})
module.exports = router;