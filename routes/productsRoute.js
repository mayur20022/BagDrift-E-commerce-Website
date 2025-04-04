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



module.exports = router