
const MoodLog = require('../models/MoodLog');

exports.logMood = async (req, res) => {
  try {
    const log = await MoodLog.create({ ...req.body, user: req.user.id });
    res.json({ success: true, log });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await MoodLog.find({ user: req.user.id });
    res.json({ success: true, logs });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getTrends = async (req, res) => {
  try {
    const logs = await MoodLog.find({ user: req.user.id }).sort({ loggedAt: 1 });
    res.json({ success: true, trends: logs });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
