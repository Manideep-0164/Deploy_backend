const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    
        const token = req.headers.authorization
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECREAT, (err, decoded) => {
            if(err){
                res.send({ "msg": "Please Login" })
            }
            else {
                const { user } = decoded;
                req.body.author = user;
                next();
            }
        })
}

module.exports = {
    authenticate,
}