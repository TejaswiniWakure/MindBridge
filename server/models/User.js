const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  preferredName: String,
  role: { type: String, enum: ['user', 'therapist', 'admin'], default: 'user' },
  phone: String,
  age: Number,
  dateOfBirth: Date,
  gender: String,
  language: { type: String, default: 'English' },
  city: String,
  timezone: String,
  onboardingStatus: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
  onboardingStep: { type: Number, default: 0 },
  accountStatus: { type: String, enum: ['active', 'suspended', 'deleted', 'PENDING_EMAIL_VERIFICATION'], default: 'active' },
  emailVerified: { type: Boolean, default: false },
  riskStatus: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
  goals: [String],
  availableTime: Number,
  preferredContent: [String],
  reminderTime: String,
  reminderFrequency: String,
  assignedTherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: String,
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(cand) {
  return bcrypt.compare(cand, this.password);
};

module.exports = mongoose.model('User', userSchema);
