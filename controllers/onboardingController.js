
const User = require('../models/User');
const ConsentRecord = require('../models/ConsentRecord');

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.updateGoals = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { goals: req.body.goals }, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.updatePreferences = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.saveConsent = async (req, res) => {
  try {
    const records = req.body.consents.map(c => ({ ...c, user: req.user.id }));
    await ConsentRecord.insertMany(records);
    res.json({ success: true });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.getStatus = async (req, res) => {
  res.json({ success: true, status: req.user.onboardingStatus, step: req.user.onboardingStep });
};
exports.complete = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { onboardingStatus: 'completed' }, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
