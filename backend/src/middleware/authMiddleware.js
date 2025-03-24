const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function authenticateUser(req, res, next) {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; // Get token from header
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = await User.findById(decoded.userId).select('-password'); // Attach user info to req
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next(); // Move to next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error });
    }
}

module.exports = { authenticateUser };
