const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklisttoken.model");

async function authUser(req, res, next) {
    // 1. Safely extract token from cookies
    const token = req.cookies?.token;

    // 🟢 FIX 1: Change to 401 (Unauthorized) so frontend knows to redirect to login
    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing. Please log in."
        });
    }

    // 2. Check if the token was logged out (blacklisted)
    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token: token });

    // 🟢 FIX 2: Added 'return' to halt execution and changed status code to 401
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is invalid or has been logged out."
        });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        return next(); // 🟢 Explicitly call next route handler
    }
    catch (error) {
            
        return res.status(401).json({
            message: "Session expired or invalid token structure."
        });
    }
}

module.exports = {
    authUser
};