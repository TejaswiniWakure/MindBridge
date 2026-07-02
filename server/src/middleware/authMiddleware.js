const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login required' });
  }

  try {
    // Demo mock token check
    if (token === 'mock-token-jwt') {
      req.user = {
        id: 'mock-id',
        name: 'DEMO USER',
        email: 'demo@mindwell.com',
        role: 'teen' // default fallback role for simple auth mock
      };
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_mindwell_token_key_123!');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ success: false, message: 'Session expired, login again' });
  }
};

// Check if user has required roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'Guest'}) is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};
