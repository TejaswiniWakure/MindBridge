const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  professionalTitle: { type: String, required: true },
  qualification: { type: String, required: true },
  specializations: [String],
  experienceYears: Number,
  languages: [String],
  bio: String,
  sessionTypes: [String],
  pricing: Number,
  availability: { type: Map, of: [String] },
  verificationStatus: { type: String, enum: ['PENDING_EMAIL_VERIFICATION', 'APPLICATION_INCOMPLETE', 'PENDING_REVIEW', 'CHANGES_REQUESTED', 'APPROVED', 'SUBSCRIPTION_REQUIRED', 'PAYMENT_PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED'], default: 'APPLICATION_INCOMPLETE' },
  subscriptionStatus: { type: String, enum: ['INACTIVE', 'ACTIVE', 'EXPIRED'], default: 'INACTIVE' },
  adminNotes: String,
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('TherapistProfile', schema);
