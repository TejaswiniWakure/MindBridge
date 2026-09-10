const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    name: String, email: String, phone: String, relation: String,
    permissions: { moodTrends: Boolean, taskCompletion: Boolean, journalSummaries: Boolean, assessmentSummaries: Boolean, emergencyAlerts: Boolean },
    status: { type: String, enum: ['pending', 'active', 'removed'], default: 'pending' },
    inviteToken: String,
    joinedAt: Date
  }]
}, { timestamps: true });
module.exports = mongoose.model('SupportCircle', schema);
