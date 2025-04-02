const express = require('express')
const router = express.Router()
const Owner = require('../models/ownermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get("/", (req, res) => {
    res.send("Hello World")
})

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            const { email, username, password } = req.body
            let owners = await Owner.find();
            if (owners.length > 0) {
                return res.status(403).send("You don't have permission to create a new owner.")
            }
            const owner = new Owner({
                email: email,
                username: username,
                password: password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(owner.password, salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).send({ message: err })
                    }
                    owner.password = hash
                    await owner.save();
                    res.status(201).send(owner);
                })
            })

            let OwnerToken = jwt.sign({ email: owner.email, id: owner.id }, process.env.JWT_KEY)
            res.cookie("token", OwnerToken)

            res.status(201).send({ owner, token: OwnerToken })

        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    });
}






module.exports = router