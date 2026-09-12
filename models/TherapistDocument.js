const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentType: { type: String, required: true },
  storageKey: { type: String, required: true },
  originalName: { type: String },
  verificationStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('TherapistDocument', schema);
