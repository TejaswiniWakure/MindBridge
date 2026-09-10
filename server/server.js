require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const socketHandler = require('./sockets/socketHandler');
const { Server } = require('socket.io');

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Attach io to app for use in routes
app.set('io', io);

// ── Global Middleware ──
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLimiter);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Mindwell API', timestamp: new Date().toISOString() });
});

// ── API Routes ──

// Auth & Onboarding
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/onboarding', require('./routes/onboardingRoutes'));
app.use('/api/triage', require('./routes/triageRoutes'));

// User Features
app.use('/api/assessments', require('./routes/assessmentRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/mood', require('./routes/moodRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));
app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/ai/coach', require('./routes/aiCoachRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/support-circle', require('./routes/supportCircleRoutes'));
app.use('/api/professionals', require('./routes/professionalRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/safety', require('./routes/safetyRoutes'));

// Therapist Portal

app.use('/api/therapist/application', require('./routes/therapistRoutes'));
app.use('/api/therapist', require('./routes/therapistDashRoutes'));

// Admin Portal
app.use('/api/admin', require('./routes/adminRoutes'));

// ── Error Handling ──
app.use(notFound);
app.use(errorHandler);

// ── Socket.IO Handler ──
socketHandler(io);

// ── Start Server ──
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🌿 Mindwell API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}\n`);
});

module.exports = { app, server };
