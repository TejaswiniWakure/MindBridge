const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Utility to sign JWT tokens
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_mindwell_token_key_123!',
    { expiresIn: '30d' }
  );
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All inputs are required' });
    }

    // Check if Mongo is connected
    const isDBConnected = mongoose.connection.readyState === 1;

    if (!isDBConnected) {
      console.log('Registering in Mock Mode');
      const token = generateToken('mock-id', role || 'teen');
      return res.status(201).json({
        success: true,
        token,
        user: { id: 'mock-id', name, email, role: role || 'teen' }
      });
    }

    // Checking if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'teen'
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const isDBConnected = mongoose.connection.readyState === 1;

    if (!isDBConnected) {
      console.log('Logging in in Mock Mode');
      let mockRole = 'teen';
      if (email.startsWith('parent')) mockRole = 'parent';
      if (email.startsWith('therapist')) mockRole = 'therapist';
      if (email.startsWith('admin')) mockRole = 'admin';

      const token = generateToken('mock-id', mockRole);
      return res.status(200).json({
        success: true,
        token,
        user: { id: 'mock-id', name: email.split('@')[0].toUpperCase(), email, role: mockRole }
      });
    }

    // Find user in database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    if (req.user.id === 'mock-id') {
      return res.status(200).json({
        success: true,
        user: req.user
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('GetMe error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
