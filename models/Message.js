const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conversationId: { type: String, required: true },
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  readAt: Date
}, { timestamps: true });
module.exports = mongoose.model('Message', schema);
