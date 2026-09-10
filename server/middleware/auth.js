const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
};

exports.ownershipCheck = (model, paramIdField) => async (req, res, next) => {
  try {
    const doc = await model.findById(req.params[paramIdField]);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    if (doc.user && doc.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this resource' });
    }
    req.resource = doc;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
