
const JournalEntry = require('../models/JournalEntry');

exports.create = async (req, res) => {
  try {
    const entry = await JournalEntry.create({ ...req.body, user: req.user.id });
    res.json({ success: true, entry });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.getAll = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id });
    res.json({ success: true, entries });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.getOne = async (req, res) => {
  try {
    const entry = req.resource;
    res.json({ success: true, entry });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.update = async (req, res) => {
  try {
    const entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, entry });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
exports.delete = async (req, res) => {
  try {
    await JournalEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
