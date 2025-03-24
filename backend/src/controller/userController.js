const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req,res) => {
    const {userEmail , password , confirmPassword } = req.body;

    try{
        const userExist = await User.findOne ({userEmail});
        if (userExist){
            return res.status(400).json({ message : 'user already exists'});
        }

        if(password != confirmPassword){
            return res.status(400).json({ message : 'passwords do not match'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            userEmail,
            password:hashPassword,
        });

        await newUser.save();
        res.status(201).json({ message : 'user created successfully'});
    } 
        catch (error) {
            res.status(500).json({message : 'error creating user' , error: error.message});
        }
};

const loginUser = async (req,res) => {
    const {userEmail , password} = req.body;

    try{
        const user = await User.findOne({userEmail});

        if(!user){
            return res.status(400).json({ message : 'user does not exist'});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch){
            return res.status(400).json({ message : 'password is incorrect'});
        }

        const token = jwt.sign(
            {userEmail: user.userEmail},
            'yourSecretKey',
            {expiresIn: '1h'}
        );

        res.status(200).json({
            message : 'Login successful',
            token : token,
            userEmail : user.userEmail
        });
    }

    catch (error){
        console.error(error);
        res.status(500).json({message : 'error logging in user' ,error : error.message});
    }
};

module.exports = { registerUser , loginUser };
