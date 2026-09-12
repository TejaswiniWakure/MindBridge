const mongoose = require('mongoose');

const therapistApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qualifications: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  specialties: [{ type: String }],
  bio: { type: String },
  fees: { type: Number },
  status: { type: String, enum: ['pending', 'under_review', 'approved', 'rejected', 'needs_changes'], default: 'pending' },
  adminNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TherapistApplication', therapistApplicationSchema);
