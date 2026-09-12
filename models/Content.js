const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  body: String,
  type: { type: String, enum: ['article', 'exercise', 'audio', 'video', 'resource'] },
  topic: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  riskLevel: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
  tags: [String],
  published: { type: Boolean, default: false },
  author: String
}, { timestamps: true });
module.exports = mongoose.model('Content', schema);
