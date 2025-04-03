const express = require('express')
const router = express()
const upload = require('../config/mulerConfig')
const Products = require("../models/productmodel")
const isLoggin = require('../middlewares/isLoggin')


router.post("/create", isLoggin,upload, async (req, res) => {

   try {
       const { name, price, discount, bgcolor, panelcolor, textcolor, } = req.body

       const product = await Products.create({
           name,
           price,
           discount,
           image: req.file.buffer,
           bgcolor,
           panelcolor,
           textcolor,
       })
       req.flash("success","Product create successfully")
       res.redirect("/owner/admin")
   } catch (error) {
       res.status(400).json({ message: error.message })
   }
})

router.get("/addtocart/:id", isLoggin,async(req, res) => {
    const id = req.params.id;
    const user = req.user;
    user.cart.push(id)
    user.save()
    res.send(user)
})

module.exports = router