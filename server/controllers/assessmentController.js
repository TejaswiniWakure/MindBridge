
const Assessment = require('../models/Assessment');
const AssessmentResult = require('../models/AssessmentResult');
const CrisisEvent = require('../models/CrisisEvent');
const assessmentService = require('../services/assessmentService');

exports.getAll = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json({ success: true, assessments });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ assessmentId: req.params.assessmentId });
    res.json({ success: true, assessment });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.submit = async (req, res) => {
  try {
    const { assessmentId, responses } = req.body;
    const def = await Assessment.findOne({ assessmentId });
    const totalScore = assessmentService.scoreAssessment(def, responses);
    const { riskLevel, severity } = assessmentService.evaluateRisk(def, totalScore, responses);
    
    if (riskLevel === 'high') {
      await CrisisEvent.create({ user: req.user.id, triggerSource: 'assessment', riskLevel, triggerDetails: `High score on ${assessmentId}` });
    }
    
    const result = await AssessmentResult.create({
      user: req.user.id, assessmentId, responses, totalScore, maxScore: def.maxScore, severity, riskLevel, completedAt: new Date()
    });
    
    res.json({ success: true, result });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getResults = async (req, res) => {
  try {
    const results = await AssessmentResult.find({ user: req.user.id });
    res.json({ success: true, results });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getResult = async (req, res) => {
  try {
    const result = await AssessmentResult.findById(req.params.id);
    res.json({ success: true, result });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getSnapshot = async (req, res) => {
  try {
    const results = await AssessmentResult.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, snapshot: results });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
