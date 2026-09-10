const CrisisEvent = require('../models/CrisisEvent');
exports.analyzeText = (text) => {
  if (text.toLowerCase().includes('suicide') || text.toLowerCase().includes('kill myself')) return 'high';
  return 'low';
};
exports.createCrisisEvent = async (userId, source, details) => {
  return await CrisisEvent.create({ user: userId, triggerSource: source, riskLevel: 'high', triggerDetails: details });
};
