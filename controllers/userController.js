const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.city = req.body.city || user.city;
    user.timezone = req.body.timezone || user.timezone;
    user.goals = req.body.goals || user.goals;
    user.availableTime = req.body.availableTime || user.availableTime;
    user.preferredContent = req.body.preferredContent || user.preferredContent;
    user.onboardingStatus = req.body.onboardingStatus || user.onboardingStatus;
    
    if (req.body.consents) {
      user.consents = { ...user.consents, ...req.body.consents };
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
