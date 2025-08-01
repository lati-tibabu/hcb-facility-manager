const jwt = require('jsonwebtoken');
const config = require("../config/config");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        try{
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            next();
        } catch(error){
            res.status(401).json({message: "Invalid or expired token"});
        }
    } else {
        res.status(401).json({ message: "Authorization token is required" });
    }
};

const isAdmin = async (req, res, next) => {
    const role = req.user.role;
    if (role === "super_admin" || role === "admin"){
        next();
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
}


module.exports = {
    authMiddleware,
    isAdmin
}