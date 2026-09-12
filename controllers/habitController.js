
const HabitLog = require('../models/HabitLog');

exports.completeHabit = async (req, res) => {
  try {
    const log = await HabitLog.create({ ...req.body, user: req.user.id, completed: true, completedAt: new Date() });
    res.json({ success: true, log });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({ user: req.user.id });
    res.json({ success: true, logs });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getStreaks = async (req, res) => {
  res.json({ success: true, streaks: 5 }); // Mock
};
