const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signAccessToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '15m' });
const signRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' });

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const allowedRoles = ['user', 'therapist'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const user = await User.create({ email, password, name, role: userRole });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      token: accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingStatus: user.onboardingStatus,
        onboardingStep: user.onboardingStep
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    // Admin Backdoor
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: 'System Admin',
          email: 'admin@gmail.com',
          password: 'Admin@123',
          role: 'admin'
        });
      }
      
      const accessToken = signAccessToken(user._id);
      const refreshToken = signRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        token: accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          onboardingStatus: user.onboardingStatus,
          onboardingStep: user.onboardingStep,
          goals: user.goals,
          riskStatus: user.riskStatus
        }
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.accountStatus === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended. Please contact support.' });
    }

    // Role validation for portal-specific login
    if (role && role !== user.role && user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid portal selection for this account.' });
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      token: accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingStatus: user.onboardingStatus,
        onboardingStep: user.onboardingStep,
        goals: user.goals,
        riskStatus: user.riskStatus
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = '';
    await user.save();
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
  res.json({ success: true, message: 'Logged out successfully.' });
};

exports.refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ success: false, message: 'No refresh token.' });
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ success: false, message: 'Invalid refresh token.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (user._id.toString() !== decoded.id) {
      return res.status(403).json({ success: false, message: 'Token mismatch.' });
    }

    const accessToken = signAccessToken(user._id);
    res.json({ success: true, token: accessToken });
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token expired or invalid.' });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -refreshToken');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  res.json({ success: true, user });
};
