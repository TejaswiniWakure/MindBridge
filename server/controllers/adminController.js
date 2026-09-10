const User = require('../models/User');
const TherapistProfile = require('../models/TherapistProfile');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalTherapists = await User.countDocuments({ role: 'therapist' });
    const pendingTherapists = await TherapistProfile.countDocuments({ applicationStatus: 'PENDING_REVIEW' });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTherapists,
        pendingReviews: pendingTherapists
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPendingTherapists = async (req, res) => {
  try {
    const pending = await TherapistProfile.find({ applicationStatus: 'PENDING_REVIEW' })
      .populate('user', 'name email createdAt');
    
    res.json({ success: true, pending });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTherapistStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Status must be APPROVED, REJECTED, or NEEDS_CHANGES
    const profile = await TherapistProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    profile.applicationStatus = status;
    if (notes) profile.adminNotes = notes;
    if (status === 'APPROVED') profile.approvedAt = Date.now();

    await profile.save();

    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
