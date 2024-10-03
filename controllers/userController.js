const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, 'jwt_secret_key', { expiresIn: '1h' });
};

// Registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed' });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ message: 'Login failed' });
    }
};

// Auth middleware
exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, 'jwt_secret_key');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Read profile
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

// Update profile
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(400).json({ message: 'Update failed' });
    }
};
