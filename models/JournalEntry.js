const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: { type: String, required: true },
  aiAnalysisEnabled: { type: Boolean, default: false },
  aiThemes: [String],
  aiSentiment: String,
  aiSummary: String
}, { timestamps: true });
module.exports = mongoose.model('JournalEntry', schema);
