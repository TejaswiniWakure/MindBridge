const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['appointment', 'message', 'alert', 'reminder', 'system', 'circle_invite', 'verification'] },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: String,
  metadata: Object
}, { timestamps: true });
module.exports = mongoose.model('Notification', schema);
