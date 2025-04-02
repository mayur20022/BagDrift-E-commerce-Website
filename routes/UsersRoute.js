const express = require('express')
const router = express()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const searchedUser = await User.findOne({ email })
        if (searchedUser) return res.status(401).json({ message: "User alrady exist" }).redirect("/")

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({
                    message: "Error hashing password"
                })
                const user = new User({ username, email, password: hash })
                await user.save()
                res.redirect("/cart")
                let UserToken = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_KEY_USER)
                res.cookie("userToken", UserToken)
            })
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404)
            return res.redirect("/")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).json({ message: "Error comparing password" })
            if (!result) return res.status(401).json({ message: "Invalid password" })
            let UserToken = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_KEY_USER)
            res.cookie("token", UserToken)
            res.redirect("/shop")
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router