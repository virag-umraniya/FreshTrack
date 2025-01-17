const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to authenticate user
exports.authenticate = function (req, res, next) {
    const token = req.header('Authorization');
    console.log('Authenticating token:', token);

    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token is valid:', decoded);
        next();
    } catch (err) {
        console.log('Token is not valid:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Sign-up logic
exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log('Signup request:', req.body);

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ fullName, email, password });
        await user.save();
        console.log('User created:', user);

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Token generated:', token);
            res.json({ token });
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).send('Server error');
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request:', req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User does not exist:', email);
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials for user:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Token generated:', token);
            res.json({ token });
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
};

// Get user data
exports.getUser = async (req, res) => {
    console.log('Get user data for user ID:', req.user.id);
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log('User data retrieved:', user);
        res.json(user);
    } catch (err) {
        console.error('Get user data error:', err);
        res.status(500).send('Server error');
    }
};