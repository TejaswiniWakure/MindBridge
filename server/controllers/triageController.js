
const TriageResponse = require('../models/TriageResponse');
const CrisisEvent = require('../models/CrisisEvent');
const triageService = require('../services/triageService');

exports.submit = async (req, res) => {
  try {
    const { symptomResponses, problemAreas, safetyResponses } = req.body;
    const suicideRisk = triageService.checkSafetyRisk(safetyResponses);
    
    if (suicideRisk === 'high') {
      await CrisisEvent.create({ user: req.user.id, triggerSource: 'triage', riskLevel: 'high', triggerDetails: 'High risk from triage' });
    }
    
    const assignedAssessments = triageService.evaluateTriage(symptomResponses);
    const tr = await TriageResponse.create({
      user: req.user.id, symptomResponses, problemAreas, safetyResponses, assignedAssessments, suicideRisk
    });
    
    res.json({ success: true, assignedAssessments });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.getResult = async (req, res) => {
  try {
    const tr = await TriageResponse.findOne({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, result: tr });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
