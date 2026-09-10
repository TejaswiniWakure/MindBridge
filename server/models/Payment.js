const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  type: { type: String, enum: ['session', 'registration', 'payout'] },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: String,
  transactionId: String
}, { timestamps: true });
module.exports = mongoose.model('Payment', schema);
