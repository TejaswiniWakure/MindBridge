const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, Feedback, MoodLog, JournalEntry } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mindbridge-clinical-secret-2026';

// Middleware
app.use(cors());
app.use(express.json());

// Fallback in-memory database storage if MongoDB is not connected
let isMongoConnected = false;
const mockDb = {
    users: [],
    feedbacks: [],
    moodLogs: [],
    journalEntries: []
};

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mindbridge';
console.log('Connecting to database...');

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB successfully connected.');
        isMongoConnected = true;
    })
    .catch(err => {
        console.warn('⚠️ MongoDB connection failed. MindBridge will run using In-Memory mock database state. Error:', err.message);
        isMongoConnected = false;
    });

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = decodedUser;
        next();
    });
};

// --- API ENDPOINTS ---

// 1. User Registration (Signup)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Check if user already exists
        if (isMongoConnected) {
            const existingUser = await User.findOne({ email: normalizedEmail });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
        } else {
            const existingUser = mockDb.users.find(u => u.email === normalizedEmail);
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let savedUser = null;

        // 3. Save User
        if (isMongoConnected) {
            const newUser = new User({
                name,
                email: normalizedEmail,
                password: hashedPassword,
                role: role || 'teen'
            });
            savedUser = await newUser.save();
        } else {
            savedUser = {
                _id: new mongoose.Types.ObjectId().toString(),
                name,
                email: normalizedEmail,
                password: hashedPassword,
                role: role || 'teen',
                createdAt: new Date()
            };
            mockDb.users.push(savedUser);
        }

        // 4. Sign JWT
        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            role: savedUser.role,
            name: savedUser.name
        });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        let user = null;

        // 1. Find User
        if (isMongoConnected) {
            user = await User.findOne({ email: normalizedEmail });
        } else {
            user = mockDb.users.find(u => u.email === normalizedEmail);
        }

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // 2. Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // 3. Sign JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            role: user.role,
            name: user.name
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// 3. Submit Contact Feedback & Star Rating
app.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, subject, message, rating } = req.body;

        if (!name || !email || !subject || !message || !rating) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (isMongoConnected) {
            const newFeedback = new Feedback({ name, email, subject, message, rating });
            await newFeedback.save();
        } else {
            mockDb.feedbacks.push({
                name, email, subject, message, rating,
                createdAt: new Date()
            });
        }

        res.status(201).json({ message: 'Feedback submitted successfully' });

    } catch (err) {
        console.error('Feedback error:', err);
        res.status(500).json({ error: 'Server error saving feedback' });
    }
});

// 4. Log Teen Mood
app.post('/api/wellness/mood', authenticateToken, async (req, res) => {
    try {
        const { mood } = req.body;
        if (!mood) return res.status(400).json({ error: 'Mood is required' });

        if (isMongoConnected) {
            const newMoodLog = new MoodLog({
                userId: req.user.id,
                mood
            });
            await newMoodLog.save();
        } else {
            mockDb.moodLogs.push({
                userId: req.user.id,
                mood,
                createdAt: new Date()
            });
        }

        res.status(201).json({ message: 'Mood logged successfully' });

    } catch (err) {
        console.error('Mood logging error:', err);
        res.status(500).json({ error: 'Server error saving mood log' });
    }
});

// 5. Save and Analyze Private Teen Journal
app.post('/api/wellness/journal', authenticateToken, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Journal text is required' });

        // Simple text-based "AI analysis"
        const textLower = text.toLowerCase();
        let stressAnalysis = 'Balanced';
        let copingSuggestion = 'Nice writing! Reflecting helps regulate our feelings.';

        if (textLower.includes('stress') || textLower.includes('exam') || textLower.includes('pressure') || textLower.includes('overwhelm')) {
            stressAnalysis = 'Elevated Stress';
            copingSuggestion = 'Box Breathing suggested: breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Repeat 4 times.';
        } else if (textLower.includes('sad') || textLower.includes('cry') || textLower.includes('alone') || textLower.includes('depress')) {
            stressAnalysis = 'Low Mood / Sadness';
            copingSuggestion = 'Sensory Grounding suggested: list 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.';
        } else if (textLower.includes('anxious') || textLower.includes('worry') || textLower.includes('scared') || textLower.includes('panic')) {
            stressAnalysis = 'High Anxiety';
            copingSuggestion = 'Guided breathing suggested: focus on deep, elongated abdominal breathing cycles.';
        }

        if (isMongoConnected) {
            const newJournal = new JournalEntry({
                userId: req.user.id,
                text,
                stressAnalysis
            });
            await newJournal.save();
        } else {
            mockDb.journalEntries.push({
                userId: req.user.id,
                text,
                stressAnalysis,
                createdAt: new Date()
            });
        }

        res.status(201).json({
            message: 'Journal saved and analyzed',
            stressAnalysis,
            suggestion: copingSuggestion
        });

    } catch (err) {
        console.error('Journal saving error:', err);
        res.status(500).json({ error: 'Server error saving journal entry' });
    }
});

// 6. Get Parent Dashboard Aggregates
app.get('/api/wellness/aggregates', authenticateToken, async (req, res) => {
    try {
        // Return structured aggregates (mocked or aggregated from DB)
        // This is safe because it only exposes high-level averages, never reading private journal text.
        res.json({
            moodStability: '85%',
            moodComposition: {
                Calm: 75,
                Happy: 15,
                Anxious: 10
            },
            reflectionsLogged: '6/7 days',
            sleepHoursAverage: 8.1,
            alerts: [
                { type: 'meditation', text: 'Teen logged a meditation session.', time: 'Today, 9:00 AM' },
                { type: 'sleep', text: 'Sleep tracking logged 8 hours of stable sleep.', time: 'Yesterday' },
                { type: 'checkin', text: 'Weekly check-in complete. Emotional indexes balanced.', time: 'Sunday' }
            ]
        });

    } catch (err) {
        console.error('Fetch aggregates error:', err);
        res.status(500).json({ error: 'Server error fetching wellness statistics' });
    }
});

// 7. Get Dynamic Assessment Questions for GAD-7, PHQ-A, PSS-10, SDQ, WHO-5
app.get('/api/assessment/questions', (req, res) => {
    res.json({
        phqa: {
            name: "Depression Screening (PHQ-A)",
            questions: [
                { id: 1, text: "Feeling sad, depressed, irritable, or hopeless?" },
                { id: 2, text: "Loss of interest or pleasure in doing things?" },
                { id: 3, text: "Trouble falling asleep, staying asleep, or sleeping too much?" },
                { id: 4, text: "Feeling tired or having little energy?" },
                { id: 5, text: "Poor appetite, weight loss, or overeating?" },
                { id: 6, text: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?" },
                { id: 7, text: "Trouble concentrating on things like school work, reading, or watching TV?" },
                { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or being so restless that you have been moving around a lot more than usual?" },
                { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way?" }
            ],
            options: [
                { score: 0, label: "Not at all" },
                { score: 1, label: "Several days" },
                { score: 2, label: "More than half the days" },
                { score: 3, label: "Nearly every day" }
            ]
        },
        gad7: {
            name: "Anxiety Screening (GAD-7)",
            questions: [
                { id: 1, text: "Feeling nervous, anxious, or on edge?" },
                { id: 2, text: "Not being able to stop or control worrying?" },
                { id: 3, text: "Worrying too much about different things?" },
                { id: 4, text: "Trouble relaxing?" },
                { id: 5, text: "Being so restless that it is hard to sit still?" },
                { id: 6, text: "Becoming easily annoyed or irritable?" },
                { id: 7, text: "Feeling afraid, as if something awful might happen?" }
            ],
            options: [
                { score: 0, label: "Not at all" },
                { score: 1, label: "Several days" },
                { score: 2, label: "More than half the days" },
                { score: 3, label: "Nearly every day" }
            ]
        },
        pss10: {
            name: "Stress Assessment (PSS-10)",
            questions: [
                { id: 1, text: "Felt upset because of something that happened unexpectedly?" },
                { id: 2, text: "Felt that you were unable to control the important things in your life?" },
                { id: 3, text: "Felt nervous and stressed?" },
                { id: 4, text: "Felt confident about your ability to handle your personal problems?" },
                { id: 5, text: "Felt that things were going your way?" },
                { id: 6, text: "Found that you could not cope with all the things that you had to do?" },
                { id: 7, text: "Been able to control irritations in your life?" },
                { id: 8, text: "Felt that you were on top of things?" },
                { id: 9, text: "Been angered because of things that happened that were outside of your control?" },
                { id: 10, text: "Felt difficulties were piling up so high that you could not overcome them?" }
            ],
            options: [
                { score: 0, label: "Never" },
                { score: 1, label: "Almost Never" },
                { score: 2, label: "Sometimes" },
                { score: 3, label: "Fairly Often" },
                { score: 4, label: "Very Often" }
            ]
        },
        sdq: {
            name: "Behavior & Social Screening (SDQ)",
            questions: [
                { id: 1, text: "I try to be nice to other people. I care about their feelings." },
                { id: 2, text: "I am restless, I cannot stay still for long." },
                { id: 3, text: "I get a lot of headaches, stomach-aches or sickness." },
                { id: 4, text: "I usually share with others (food, games, pens, etc.)." },
                { id: 5, text: "I get very angry and often lose my temper." },
                { id: 6, text: "I am rather solitary, I tend to play alone." },
                { id: 7, text: "I usually do as I am told." },
                { id: 8, text: "I worry a lot." },
                { id: 9, text: "I am helpful if someone is hurt, upset or feeling ill." },
                { id: 10, text: "I am constantly fidgeting or squirming." },
                { id: 11, text: "I have at least one good friend." },
                { id: 12, text: "I fight a lot. I can make other people do what I want." },
                { id: 13, text: "I am often unhappy, downhearted or tearful." },
                { id: 14, text: "Other people my age generally like me." },
                { id: 15, text: "I am easily distracted, I find it difficult to concentrate." },
                { id: 16, text: "I am nervous in new situations. I easily lose confidence." },
                { id: 17, text: "I am kind to younger children." },
                { id: 18, text: "I am often accused of lying or cheating." },
                { id: 19, text: "Other children or young people bully me or pick on me." },
                { id: 20, text: "I often volunteer to help others (parents, teachers, children)." },
                { id: 21, text: "I think before I do things." },
                { id: 22, text: "I take things that are not mine from home, school or elsewhere." },
                { id: 23, text: "I get on better with adults than with people my own age." },
                { id: 24, text: "I have many fears, I am easily scared." },
                { id: 25, text: "I finish the work I'm doing. I have good attention span." }
            ],
            options: [
                { score: 0, label: "Not True" },
                { score: 1, label: "Somewhat True" },
                { score: 2, label: "Certainly True" }
            ]
        },
        who5: {
            name: "Overall Well-being (WHO-5)",
            questions: [
                { id: 1, text: "I have felt cheerful and in good spirits." },
                { id: 2, text: "I have felt calm and relaxed." },
                { id: 3, text: "I have felt active and vigorous." },
                { id: 4, text: "I have woken up feeling fresh and rested." },
                { id: 5, text: "My daily life has been filled with things that interest me." }
            ],
            options: [
                { score: 5, label: "All of the time" },
                { score: 4, label: "Most of the time" },
                { score: 3, label: "More than half the time" },
                { score: 2, label: "Less than half the time" },
                { score: 1, label: "Some of the time" },
                { score: 0, label: "At no time" }
            ]
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 MindBridge Server running on port ${PORT}`);
});
