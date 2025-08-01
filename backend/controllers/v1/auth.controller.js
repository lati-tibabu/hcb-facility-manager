const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config")

const authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if(!user){
            return res.status(401).json({error: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const authenticatedUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role
        }
        const token = jwt.sign(authenticatedUser, config.jwtSecret, {
            expiresIn: "1hr"
        })
        res.status(201).json({token: token})    
    } catch (error) {
        res.status(500).json({error: "Failed to authenticate:"});
    }
};

module.exports = {
    authenticateUser
};