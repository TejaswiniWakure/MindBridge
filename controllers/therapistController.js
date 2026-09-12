const TherapistProfile = require('../models/TherapistProfile');
const TherapistDocument = require('../models/TherapistDocument');
const TherapistClient = require('../models/TherapistClient');
const User = require('../models/User');

exports.apply = async (req, res) => {
  try {
    const { professionalTitle, qualification, specializations, experienceYears, bio, languages, sessionTypes, pricing, availability, documents } = req.body;
    
    // Create or update profile
    let profile = await TherapistProfile.findOne({ user: req.user.id });
    if (!profile) {
      profile = new TherapistProfile({ user: req.user.id });
    }
    
    profile.professionalTitle = professionalTitle;
    profile.qualification = qualification;
    profile.specializations = specializations;
    profile.experienceYears = experienceYears;
    profile.bio = bio;
    profile.languages = languages;
    profile.sessionTypes = sessionTypes;
    profile.pricing = pricing;
    profile.availability = availability;
    
    // Admin review state
    profile.verificationStatus = 'PENDING_REVIEW';
    await profile.save();

    // Mock save documents
    if (documents && documents.length > 0) {
      const docRecords = documents.map(doc => ({
        therapist: req.user.id,
        documentType: doc.type,
        storageKey: doc.filename, // simulated storage
        originalName: doc.filename
      }));
      await TherapistDocument.insertMany(docRecords);
    }

    res.status(201).json({ success: true, profile });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAppStatus = async (req, res) => {
  try {
    const profile = await TherapistProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.json({ success: true, status: 'NOT_STARTED' });
    }
    res.json({ success: true, status: profile.verificationStatus, profile });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
