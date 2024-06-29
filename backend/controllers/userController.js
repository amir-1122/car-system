const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS } = require('../config');

// Sign Up
exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const createdUser = new User({
            username: username,
            email: email,
            password: password,
        });

          // Send Welcome Email
          let transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: "2a4d63918d2088",
                pass: "f2275f011c4931",
            },
        });
    
        let mailOptions = {
            from: "amir@gmail.com",
            to: email,
            subject: 'Welcome to Car System',
            text: `Your login password is ${password}`,
        };
    
        try {
            await transporter.sendMail(mailOptions);
            await createdUser.save();
            res.status(201).json({ message: 'User created and email sent' });
        } catch (err) {
            console.error('Error sending email:', err); // Log the error for more details
            res.status(500).json({ message: 'Error sending email' });
        }

        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
   
};

// Sign In
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User Not found' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.totalUser = async (req, res) =>{
    const total = await User.countDocuments();
    res.status(200).json({ totalUser: total })
}

