const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');  // Import your User model
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        // Extract user info from token payload
        const { email} = ticket.getPayload();

        // Check if user exists in DB
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user (without password)
            user = new User({
                userEmail: email
            });

            await user.save();
        }

        // Generate JWT for session
        const accessToken = jwt.sign({ id: user.userId, email: user.userEmail }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({ message: 'Login successful', user, accessToken });

    } catch (error) {
        console.error("Google auth error:", error);
        res.status(401).json({ message: 'Invalid Google token', error: error.message });
    }
};

module.exports = { googleAuth };
