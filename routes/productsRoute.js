const express = require('express')
const router = express()

router.get("/", (req, res) => {
    res.send("Hello World")
})


module.exports = router