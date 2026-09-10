const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentPlan' },
  taskTitle: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('HabitLog', schema);
