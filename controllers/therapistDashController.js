const TherapistClient = require('../models/TherapistClient');
const User = require('../models/User');
const AssessmentResult = require('../models/AssessmentResult');
const TreatmentPlan = require('../models/TreatmentPlan');

exports.getDashboard = async (req, res) => {
  try {
    // Basic stats
    const activeClientsCount = await TherapistClient.countDocuments({ therapist: req.user.id, relationshipStatus: 'ACTIVE' });
    
    res.json({
      success: true,
      stats: {
        activeClients: activeClientsCount,
        sessionsThisWeek: 0,
        pendingReviews: 0
      },
      schedule: [],
      recentActivity: []
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await TherapistClient.find({ therapist: req.user.id })
      .populate('client', 'name preferredName age gender email riskStatus');
    
    res.json({ success: true, clients });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getClientDetail = async (req, res) => {
  try {
    const relationship = await TherapistClient.findOne({ 
      therapist: req.user.id, 
      client: req.params.id 
    }).populate('client', 'name preferredName age gender email phone riskStatus goals');

    if (!relationship) {
      return res.status(404).json({ success: false, message: 'Client not found or not assigned to you' });
    }

    const assessments = await AssessmentResult.find({ user: req.params.id }).sort({ createdAt: -1 });
    const plans = await TreatmentPlan.find({ user: req.params.id }).sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      client: relationship.client,
      assessments,
      plans
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
