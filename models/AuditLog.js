const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actorRole: String,
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: String,
  details: String,
  ipAddress: String
}, { timestamps: true });
module.exports = mongoose.model('AuditLog', schema);
