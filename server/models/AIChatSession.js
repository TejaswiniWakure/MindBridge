const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'New Chat' },
  messages: [{ role: { type: String, enum: ['user', 'assistant', 'system'] }, content: String, timestamp: Date }]
}, { timestamps: true });
module.exports = mongoose.model('AIChatSession', schema);
