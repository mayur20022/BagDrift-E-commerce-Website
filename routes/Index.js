const express = require('express')
const isLoggin = require('../middlewares/isLoggin')
const router = express.Router()

router.get('/', (req, res) => {
    let error = req.flash("error")
   res.render('index',{error})
})

router.get("/cart", isLoggin, (req, res) => {
    res.render("cart")
})
router.get("/shop", isLoggin, (req, res) => {
    res.render("shop")
})

module.exports = router;