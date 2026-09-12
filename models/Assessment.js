const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  assessmentId: { type: String, unique: true },
  name: { type: String, required: true },
  description: String,
  type: String,
  instructions: String,
  timeEstimate: String,
  questions: [{
    text: String,
    options: [{ text: String, score: Number }],
    riskFlags: [{ optionScore: Number, flag: String }]
  }],
  scoringRules: [{ minScore: Number, maxScore: Number, severity: String, riskLevel: String, description: String }],
  maxScore: Number
});
module.exports = mongoose.model('Assessment', schema);
