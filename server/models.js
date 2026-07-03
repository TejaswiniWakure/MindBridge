const mongoose = require('mongoose');

// --- 1. USER SCHEMA ---
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['teen', 'parent', 'therapist'],
        default: 'teen'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- 2. FEEDBACK SCHEMA (Contact & Star ratings) ---
const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- 3. MOOD LOG SCHEMA ---
const MoodLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        required: true,
        enum: ['Happy', 'Calm', 'Tired', 'Anxious', 'Sad']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- 4. JOURNAL ENTRY SCHEMA ---
const JournalEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    stressAnalysis: {
        type: String,
        default: 'Balanced'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export all models
const User = mongoose.model('User', UserSchema);
const Feedback = mongoose.model('Feedback', FeedbackSchema);
const MoodLog = mongoose.model('MoodLog', MoodLogSchema);
const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);

module.exports = {
    User,
    Feedback,
    MoodLog,
    JournalEntry
};
