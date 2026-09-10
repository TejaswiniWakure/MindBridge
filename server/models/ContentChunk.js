const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
  chunkText: { type: String, required: true },
  embedding: [Number],
  topic: String,
  tags: [String],
  riskLevel: { type: String, default: 'low' }
}, { timestamps: true });
module.exports = mongoose.model('ContentChunk', schema);
