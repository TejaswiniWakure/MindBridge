
const TreatmentPlan = require('../models/TreatmentPlan');
const AssessmentResult = require('../models/AssessmentResult');
const planService = require('../services/planService');

exports.generate = async (req, res) => {
  try {
    const results = await AssessmentResult.find({ user: req.user.id });
    const planData = planService.generatePlan(results, req.user.goals, req.user.preferredContent);
    planData.user = req.user.id;
    const plan = await TreatmentPlan.create(planData);
    res.json({ success: true, plan });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getCurrent = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findOne({ user: req.user.id, status: 'active' });
    res.json({ success: true, plan });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.markTask = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findById(req.params.id);
    if (!plan || plan.user.toString() !== req.user.id) return res.status(403).json({ success: false });
    // Assuming flat structure or searching in modules (mock implementation)
    res.json({ success: true, plan });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.adjust = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, plan });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getHistory = async (req, res) => {
  try {
    const plans = await TreatmentPlan.find({ user: req.user.id });
    res.json({ success: true, plans });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
