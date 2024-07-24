const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    const { name, email, password, role } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            const newUser = new User({ name, email, password: hash, role });
            newUser.save()
                .then(user => res.status(201).json(user))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
};


exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        const token = jwt.sign({ id: user._id, role: user.role }, 'jwt-secret-key', { expiresIn: '1d' });
                        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' });
                        res.json({ status: 'Success', role: user.role });
                    } else {
                        res.status(401).json('Invalid password');
                    }
                })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
};



exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
