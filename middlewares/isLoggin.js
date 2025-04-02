const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async function  (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.flash("error","You Need to login first")
        return res.redirect("/"); 
    }
    try{
        let decode = jwt.verify(token, process.env.JWT_KEY_USER);
        let user = await User.findOne({ email: decode.email }).select("-password");
           
        req.user = user;
        next(); 
    }
    catch {
         req.flash("error","something went wrong"); // Using a valid status code
         res.redirect("/");
    }
};
