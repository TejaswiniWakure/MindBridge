const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');

// Models
const User = require('../models/User');
const ConsentRecord = require('../models/ConsentRecord');
const TriageResponse = require('../models/TriageResponse');
const Assessment = require('../models/Assessment');
const AssessmentResult = require('../models/AssessmentResult');
const TreatmentPlan = require('../models/TreatmentPlan');
const MoodLog = require('../models/MoodLog');
const HabitLog = require('../models/HabitLog');
const JournalEntry = require('../models/JournalEntry');
const AIChatSession = require('../models/AIChatSession');
const SupportCircle = require('../models/SupportCircle');
const TherapistProfile = require('../models/TherapistProfile');
const Availability = require('../models/Availability');
const Booking = require('../models/Booking');
const Content = require('../models/Content');
const ContentChunk = require('../models/ContentChunk');
const Notification = require('../models/Notification');

// Data
const assessmentDefs = require('./assessmentDefinitions');
const contentData = require('./contentData');

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to database. Seeding...');

    // Clear all collections
    const collections = [User, ConsentRecord, TriageResponse, Assessment, AssessmentResult, TreatmentPlan, MoodLog, HabitLog, JournalEntry, AIChatSession, SupportCircle, TherapistProfile, Availability, Booking, Content, ContentChunk, Notification];
    for (const Model of collections) {
      await Model.deleteMany({});
    }
    console.log('Cleared all collections.');

    // ── 1. Create Users ──
    const admin = await User.create({
      email: 'admin@mindwell.com',
      password: 'Admin123!',
      role: 'admin',
      name: 'Admin User',
      onboardingStatus: 'completed',
      accountStatus: 'active'
    });

    const therapistUser = await User.create({
      email: 'therapist@mindwell.com',
      password: 'Therapist123!',
      role: 'therapist',
      name: 'Dr. Sarah Chen',
      onboardingStatus: 'completed',
      accountStatus: 'active'
    });

    const demoUser = await User.create({
      email: 'user@mindwell.com',
      password: 'User123!',
      role: 'user',
      name: 'Alex Johnson',
      onboardingStatus: 'completed',
      onboardingStep: 6,
      accountStatus: 'active',
      age: 25,
      gender: 'Non-binary',
      language: 'English',
      city: 'San Francisco',
      timezone: 'America/Los_Angeles',
      goals: ['Stress', 'Anxiety', 'Sleep'],
      availableTime: 15,
      preferredContent: ['Text', 'Audio'],
      reminderTime: 'Morning',
      reminderFrequency: 'Daily',
      assignedTherapist: therapistUser._id,
      riskStatus: 'moderate'
    });

    console.log('Created users: admin, therapist, demo user.');

    // ── 2. Create Consent Records for demo user ──
    const consentTypes = ['terms', 'privacy', 'not_emergency', 'ai_personalization', 'ai_journal', 'therapist_sharing'];
    for (const ct of consentTypes) {
      await ConsentRecord.create({ user: demoUser._id, consentType: ct, granted: true });
    }
    console.log('Created consent records.');

    // ── 3. Create Therapist Profile ──
    await TherapistProfile.create({
      user: therapistUser._id,
      qualifications: 'PhD in Clinical Psychology, Stanford University',
      licenseNumber: 'PSY-2024-CA-8847',
      licenseExpiry: new Date('2027-12-31'),
      specialties: ['Anxiety', 'Stress', 'Student Wellbeing', 'CBT', 'Mindfulness'],
      languages: ['English', 'Hindi', 'Mandarin'],
      bio: 'Dr. Sarah Chen is a licensed clinical psychologist specializing in anxiety disorders and stress management. With over 8 years of experience working with students and young adults, she uses evidence-based approaches including CBT and mindfulness-based techniques.',
      fees: 120,
      yearsOfExperience: 8,
      acceptingClients: true,
      rating: 4.8,
      reviewCount: 47,
      applicationStatus: 'approved',
      approvedAt: new Date('2024-06-15')
    });
    console.log('Created therapist profile.');

    // ── 4. Create Availability ──
    const days = [1, 2, 3, 4, 5]; // Monday to Friday
    for (const day of days) {
      await Availability.create({
        therapist: therapistUser._id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      });
    }
    console.log('Created availability.');

    // ── 5. Seed Assessments ──
    await Assessment.insertMany(assessmentDefs);
    console.log(`Seeded ${assessmentDefs.length} assessment definitions.`);

    // ── 6. Seed Content ──
    const createdContent = await Content.insertMany(contentData);
    console.log(`Seeded ${contentData.length} content items.`);

    // ── 7. Create ContentChunks (mock embeddings for RAG) ──
    for (const content of createdContent) {
      const chunks = content.body ? content.body.match(/.{1,500}/g) || [content.body] : [content.description];
      for (const chunk of chunks) {
        await ContentChunk.create({
          contentId: content._id,
          chunkText: chunk,
          embedding: new Array(384).fill(0), // Mock embedding vector
          topic: content.topic,
          tags: content.tags,
          riskLevel: content.riskLevel || 'low'
        });
      }
    }
    console.log('Created content chunks with mock embeddings.');

    // ── 8. Create Assessment Results for demo user ──
    const phq9Result = await AssessmentResult.create({
      user: demoUser._id,
      assessmentId: 'PHQ-9',
      responses: [
        { questionIndex: 0, selectedOptionIndex: 2, score: 2 },
        { questionIndex: 1, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 2, selectedOptionIndex: 2, score: 2 },
        { questionIndex: 3, selectedOptionIndex: 2, score: 2 },
        { questionIndex: 4, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 5, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 6, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 7, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 8, selectedOptionIndex: 0, score: 0 }
      ],
      totalScore: 11,
      maxScore: 27,
      severity: 'Moderate',
      riskLevel: 'moderate',
      riskFlags: [],
      completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    });

    const gad7Result = await AssessmentResult.create({
      user: demoUser._id,
      assessmentId: 'GAD-7',
      responses: [
        { questionIndex: 0, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 1, selectedOptionIndex: 2, score: 2 },
        { questionIndex: 2, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 3, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 4, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 5, selectedOptionIndex: 1, score: 1 },
        { questionIndex: 6, selectedOptionIndex: 1, score: 1 }
      ],
      totalScore: 8,
      maxScore: 21,
      severity: 'Mild',
      riskLevel: 'low',
      riskFlags: [],
      completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    });

    console.log('Created assessment results.');

    // ── 9. Create Treatment Plan ──
    const plan = await TreatmentPlan.create({
      user: demoUser._id,
      track: 'Stress Reset',
      status: 'active',
      durationWeeks: 6,
      currentWeek: 3,
      focusAreas: ['Stress management', 'Recovery', 'Sleep routine', 'Work-life balance'],
      dailyTimeCommitment: 15,
      modules: [
        {
          title: 'Stress Awareness', description: 'Identifying your stress patterns', week: 1, order: 1, status: 'completed',
          tasks: [
            { title: 'Stress journal', type: 'check-in', duration: 5, completed: true, completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
            { title: '5-minute breathing', type: 'breathing', duration: 5, completed: true, completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
            { title: 'Morning intention', type: 'reflection', duration: 3, completed: true, completedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) },
            { title: 'Screen-free evening', type: 'habit', duration: 60, completed: true, completedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) }
          ]
        },
        {
          title: 'Recovery Practices', description: 'Building stress recovery habits', week: 2, order: 2, status: 'completed',
          tasks: [
            { title: 'Progressive relaxation', type: 'exercise', duration: 15, completed: true, completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
            { title: 'Nature time', type: 'activity', duration: 15, completed: true, completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
            { title: 'Boundary practice', type: 'social', duration: 5, completed: true, completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
            { title: 'Evening reflection', type: 'reflection', duration: 5, completed: false }
          ]
        },
        {
          title: 'Sleep Restoration', description: 'Improving sleep quality', week: 3, order: 3, status: 'active',
          tasks: [
            { title: 'Sleep schedule', type: 'habit', duration: 5, completed: true, completedAt: new Date() },
            { title: '4-7-8 breathing', type: 'breathing', duration: 5, completed: false },
            { title: 'Caffeine audit', type: 'habit', duration: 0, completed: false },
            { title: 'Gratitude journaling', type: 'journaling', duration: 5, completed: false }
          ]
        },
        {
          title: 'Time & Energy Management', description: 'Managing your resources', week: 4, order: 4, status: 'locked',
          tasks: [
            { title: 'Priority matrix', type: 'planning', duration: 10, completed: false },
            { title: 'Mindful break', type: 'meditation', duration: 5, completed: false },
            { title: 'Exercise', type: 'exercise', duration: 20, completed: false },
            { title: 'Delegate or drop', type: 'planning', duration: 5, completed: false }
          ]
        },
        {
          title: 'Building Resilience', week: 5, order: 5, status: 'locked',
          tasks: [
            { title: 'Values check', type: 'reflection', duration: 10, completed: false },
            { title: 'Support network', type: 'social', duration: 15, completed: false },
            { title: 'Meditation', type: 'meditation', duration: 10, completed: false },
            { title: 'Fun activity', type: 'activity', duration: 20, completed: false }
          ]
        },
        {
          title: 'Sustainable Calm', week: 6, order: 6, status: 'locked',
          tasks: [
            { title: 'Progress review', type: 'reflection', duration: 10, completed: false },
            { title: 'Stress toolkit', type: 'planning', duration: 10, completed: false },
            { title: 'Future planning', type: 'planning', duration: 10, completed: false },
            { title: 'Celebration', type: 'reflection', duration: 5, completed: false }
          ]
        }
      ],
      createdBy: 'system'
    });
    console.log('Created treatment plan.');

    // ── 10. Create Mood Logs (14 days) ──
    const moodScores = [5, 4, 6, 5, 7, 6, 5, 6, 7, 6, 8, 7, 6, 7];
    const moodNotes = [
      'Feeling okay, a bit tired', 'Rough morning, better afternoon', 'Good day, breathing helped',
      'Average day', 'Felt more energetic today', 'Some stress at work', 'Managed stress better today',
      'Good walk in the park', 'Productive day', 'A little anxious but coped', 'Great day overall',
      'Feeling calmer this week', 'Some ups and downs', 'Positive outlook'
    ];
    for (let i = 0; i < 14; i++) {
      await MoodLog.create({
        user: demoUser._id,
        score: moodScores[i],
        note: moodNotes[i],
        loggedAt: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000)
      });
    }
    console.log('Created 14 mood log entries.');

    // ── 11. Create Habit Logs ──
    const habitTitles = ['5-minute breathing', 'Morning intention', 'Progressive relaxation', 'Nature time', 'Sleep schedule'];
    for (let i = 0; i < 10; i++) {
      await HabitLog.create({
        user: demoUser._id,
        planId: plan._id,
        taskTitle: habitTitles[i % habitTitles.length],
        completed: true,
        completedAt: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000)
      });
    }
    console.log('Created habit log entries.');

    // ── 12. Create Journal Entries ──
    await JournalEntry.create([
      {
        user: demoUser._id,
        title: 'First day with Mindwell',
        content: 'Started using Mindwell today. The assessment was eye-opening — I did not realize how much stress I have been carrying. Looking forward to trying the breathing exercises and building better habits. Feeling cautiously optimistic.',
        aiAnalysisEnabled: true,
        aiThemes: ['hope', 'stress awareness', 'new beginnings'],
        aiSentiment: 'cautiously positive',
        aiSummary: 'Alex is beginning their wellness journey with awareness of stress and a positive outlook.',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        user: demoUser._id,
        title: 'A tough week at work',
        content: 'Work has been incredibly demanding this week. I had three deadlines and two difficult meetings. I noticed my sleep getting worse again. But I managed to do the breathing exercise twice and it actually helped calm me down during a stressful moment. Small wins.',
        aiAnalysisEnabled: true,
        aiThemes: ['work stress', 'sleep disruption', 'coping skills', 'resilience'],
        aiSentiment: 'mixed - stressed but coping',
        aiSummary: 'Alex is experiencing work-related stress impacting sleep but is successfully applying coping techniques.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        user: demoUser._id,
        title: 'Better sleep this week',
        content: 'I have been following the sleep routine from my plan — no screens before bed, consistent bedtime, and the 4-7-8 breathing. My sleep has noticeably improved. I wake up feeling less groggy. Also talked to my friend about how I have been feeling and that helped too.',
        aiAnalysisEnabled: true,
        aiThemes: ['sleep improvement', 'routine building', 'social support', 'progress'],
        aiSentiment: 'positive',
        aiSummary: 'Alex shows meaningful progress in sleep quality through routine adherence and social connection.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Created journal entries.');

    // ── 13. Create Support Circle ──
    await SupportCircle.create({
      user: demoUser._id,
      members: [
        {
          name: 'Jordan Rivera',
          email: 'jordan@example.com',
          relation: 'Best Friend',
          permissions: { moodTrends: true, taskCompletion: true, journalSummaries: false, assessmentSummaries: false, emergencyAlerts: true },
          status: 'active',
          joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          name: 'Casey Johnson',
          email: 'casey@example.com',
          relation: 'Sibling',
          permissions: { moodTrends: true, taskCompletion: false, journalSummaries: false, assessmentSummaries: true, emergencyAlerts: true },
          status: 'active',
          joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
      ]
    });
    console.log('Created support circle.');

    // ── 14. Create Booking ──
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 3);
    nextWeek.setHours(10, 0, 0, 0);

    await Booking.create({
      user: demoUser._id,
      therapist: therapistUser._id,
      date: nextWeek,
      startTime: '10:00',
      endTime: '10:45',
      duration: 45,
      type: 'video',
      status: 'scheduled',
      consentShared: { assessmentSummaries: true, moodTrends: true, journalSummaries: false }
    });
    console.log('Created booking.');

    // ── 15. Create Notifications ──
    await Notification.create([
      {
        user: demoUser._id,
        type: 'reminder',
        title: 'Daily Check-in',
        message: 'Don\'t forget to log your mood today.',
        read: false,
        link: '/app/dashboard'
      },
      {
        user: demoUser._id,
        type: 'appointment',
        title: 'Upcoming Session',
        message: `You have a session with Dr. Sarah Chen on ${nextWeek.toLocaleDateString()}.`,
        read: false,
        link: '/app/appointments'
      },
      {
        user: therapistUser._id,
        type: 'alert',
        title: 'New Client Assigned',
        message: 'Alex Johnson has been assigned to your care.',
        read: true,
        link: '/therapist/clients'
      }
    ]);
    console.log('Created notifications.');

    // ── 16. Create Triage Response ──
    await TriageResponse.create({
      user: demoUser._id,
      symptomResponses: [
        { question: 'Feeling down, depressed, or hopeless', answer: 1 },
        { question: 'Little interest or pleasure in doing things', answer: 1 },
        { question: 'Feeling nervous, anxious, or on edge', answer: 2 },
        { question: 'Not being able to stop or control worrying', answer: 2 },
        { question: 'Feeling under constant pressure or stress', answer: 3 }
      ],
      problemAreas: ['Stress', 'Anxiety', 'Sleep'],
      safetyResponses: [
        { question: 'Thoughts that you would be better off dead', answer: 0 },
        { question: 'Thoughts of hurting yourself', answer: 0 }
      ],
      assignedAssessments: ['PHQ-9', 'GAD-7', 'PSS-10', 'SLEEP'],
      suicideRisk: 'none'
    });
    console.log('Created triage response.');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('   User:      user@mindwell.com / User123!');
    console.log('   Therapist: therapist@mindwell.com / Therapist123!');
    console.log('   Admin:     admin@mindwell.com / Admin123!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
