/**
 * Plan Generation Service — RULE-BASED plan creation.
 * AI can explain the plan but does NOT determine it.
 */

const PLAN_TEMPLATES = {
  'Mood Lift': {
    track: 'Mood Lift',
    durationWeeks: 6,
    focusAreas: ['Mood improvement', 'Energy', 'Self-care', 'Social connection'],
    modules: [
      { title: 'Building Awareness', description: 'Understanding your mood patterns and triggers', week: 1, order: 1, tasks: [
        { title: 'Morning mood check-in', description: 'Rate your mood and jot down how you feel each morning', type: 'check-in', duration: 3 },
        { title: 'Gratitude journaling', description: 'Write three things you are grateful for', type: 'journaling', duration: 5 },
        { title: 'Gentle movement', description: 'Take a 10-minute walk or do light stretching', type: 'exercise', duration: 10 },
        { title: 'Evening reflection', description: 'Reflect on one positive moment from your day', type: 'reflection', duration: 5 }
      ]},
      { title: 'Activating Positive Habits', description: 'Building daily routines that support mood', week: 2, order: 2, tasks: [
        { title: 'Morning routine', description: 'Follow a consistent morning routine', type: 'habit', duration: 15 },
        { title: 'Social connection', description: 'Reach out to one person today', type: 'social', duration: 10 },
        { title: 'Mindful breathing', description: 'Practice 4-7-8 breathing for 5 minutes', type: 'breathing', duration: 5 },
        { title: 'Mood tracker', description: 'Log your mood at midday and evening', type: 'check-in', duration: 2 }
      ]},
      { title: 'Challenging Negative Thoughts', description: 'Identifying and reframing unhelpful thinking patterns', week: 3, order: 3, tasks: [
        { title: 'Thought record', description: 'Notice and write down one negative automatic thought', type: 'cbt', duration: 10 },
        { title: 'Box breathing', description: 'Practice box breathing when stressed', type: 'breathing', duration: 5 },
        { title: 'Enjoyable activity', description: 'Do one thing you enjoy for at least 15 minutes', type: 'activity', duration: 15 },
        { title: 'Evening reflection', description: 'Reflect on what you learned today about your thoughts', type: 'reflection', duration: 5 }
      ]},
      { title: 'Building Resilience', description: 'Strengthening your ability to cope with challenges', week: 4, order: 4, tasks: [
        { title: 'Resilience journaling', description: 'Write about a challenge you overcame and what helped', type: 'journaling', duration: 10 },
        { title: 'Physical activity', description: '20 minutes of moderate exercise', type: 'exercise', duration: 20 },
        { title: 'Gratitude practice', description: 'Write three things you are grateful for', type: 'journaling', duration: 5 },
        { title: 'Social activity', description: 'Spend quality time with someone you trust', type: 'social', duration: 20 }
      ]},
      { title: 'Deepening Self-Care', description: 'Establishing sustainable self-care practices', week: 5, order: 5, tasks: [
        { title: 'Self-care check-in', description: 'Assess which self-care areas need attention', type: 'check-in', duration: 5 },
        { title: 'Mindfulness meditation', description: '10-minute guided meditation', type: 'meditation', duration: 10 },
        { title: 'Creative expression', description: 'Express yourself through art, music, or writing', type: 'activity', duration: 15 },
        { title: 'Sleep hygiene review', description: 'Review and improve your bedtime routine', type: 'habit', duration: 10 }
      ]},
      { title: 'Moving Forward', description: 'Review progress and plan for continued growth', week: 6, order: 6, tasks: [
        { title: 'Progress review', description: 'Review your mood trends and celebrate improvements', type: 'reflection', duration: 10 },
        { title: 'Future planning', description: 'Set 3 goals for the next month', type: 'planning', duration: 10 },
        { title: 'Support mapping', description: 'Identify your support resources going forward', type: 'social', duration: 10 },
        { title: 'Final reflection', description: 'Write about your journey and what you have learned', type: 'journaling', duration: 15 }
      ]}
    ]
  },
  'Anxiety Relief': {
    track: 'Anxiety Relief',
    durationWeeks: 6,
    focusAreas: ['Anxiety management', 'Relaxation', 'Thought patterns', 'Grounding'],
    modules: [
      { title: 'Understanding Your Anxiety', description: 'Learning about anxiety and its triggers', week: 1, order: 1, tasks: [
        { title: 'Anxiety awareness log', description: 'Notice and note when you feel anxious and what triggered it', type: 'check-in', duration: 5 },
        { title: 'Diaphragmatic breathing', description: 'Practice deep belly breathing for 5 minutes', type: 'breathing', duration: 5 },
        { title: 'Grounding exercise', description: 'Practice the 5-4-3-2-1 grounding technique', type: 'exercise', duration: 5 },
        { title: 'Evening wind-down', description: 'Follow a calming routine before bed', type: 'habit', duration: 10 }
      ]},
      { title: 'Relaxation Techniques', description: 'Building your relaxation toolkit', week: 2, order: 2, tasks: [
        { title: 'Progressive muscle relaxation', description: 'Tense and release each muscle group', type: 'exercise', duration: 15 },
        { title: 'Box breathing', description: 'Inhale 4, hold 4, exhale 4, hold 4', type: 'breathing', duration: 5 },
        { title: 'Worry time', description: 'Set aside 15 minutes to process worries, then let go', type: 'cbt', duration: 15 },
        { title: 'Mindful walk', description: 'Take a walk focusing on your senses', type: 'exercise', duration: 15 }
      ]},
      { title: 'Managing Worried Thoughts', description: 'CBT-based techniques for anxious thinking', week: 3, order: 3, tasks: [
        { title: 'Thought challenging', description: 'Identify and challenge one anxious thought', type: 'cbt', duration: 10 },
        { title: 'Breathing practice', description: '4-7-8 breathing technique', type: 'breathing', duration: 5 },
        { title: 'Journaling', description: 'Write about your worries and possible outcomes', type: 'journaling', duration: 10 },
        { title: 'Relaxation practice', description: 'Choose a relaxation technique and practice it', type: 'exercise', duration: 10 }
      ]},
      { title: 'Facing Fears Gradually', description: 'Gentle exposure to anxiety-provoking situations', week: 4, order: 4, tasks: [
        { title: 'Fear ladder', description: 'Create a list of anxiety triggers from mild to strong', type: 'cbt', duration: 10 },
        { title: 'Gentle exposure', description: 'Face one mild anxiety trigger today', type: 'activity', duration: 15 },
        { title: 'Recovery breathing', description: 'Practice calming breathing after exposure', type: 'breathing', duration: 5 },
        { title: 'Reflection', description: 'Write about what you noticed during exposure', type: 'reflection', duration: 10 }
      ]},
      { title: 'Building Confidence', description: 'Strengthening your ability to manage anxiety', week: 5, order: 5, tasks: [
        { title: 'Confidence journaling', description: 'Write about a time you managed anxiety well', type: 'journaling', duration: 10 },
        { title: 'Social practice', description: 'Practice a social interaction that feels challenging', type: 'social', duration: 15 },
        { title: 'Body scan meditation', description: '10-minute body scan for tension awareness', type: 'meditation', duration: 10 },
        { title: 'Gratitude practice', description: 'Note three things that went well today', type: 'journaling', duration: 5 }
      ]},
      { title: 'Maintaining Progress', description: 'Creating your ongoing anxiety management plan', week: 6, order: 6, tasks: [
        { title: 'Progress review', description: 'Review your anxiety log and celebrate improvements', type: 'reflection', duration: 10 },
        { title: 'Toolkit review', description: 'List your most effective coping strategies', type: 'planning', duration: 10 },
        { title: 'Future planning', description: 'Plan how to maintain your progress', type: 'planning', duration: 10 },
        { title: 'Final breathing practice', description: 'Practice your favorite breathing technique', type: 'breathing', duration: 5 }
      ]}
    ]
  },
  'Stress Reset': {
    track: 'Stress Reset',
    durationWeeks: 6,
    focusAreas: ['Stress management', 'Recovery', 'Sleep routine', 'Work-life balance'],
    modules: [
      { title: 'Stress Awareness', description: 'Identifying your stress patterns', week: 1, order: 1, tasks: [
        { title: 'Stress journal', description: 'Track your stress levels and triggers throughout the day', type: 'check-in', duration: 5 },
        { title: '5-minute breathing', description: 'Practice box breathing for stress relief', type: 'breathing', duration: 5 },
        { title: 'Morning intention', description: 'Set one calm intention for the day', type: 'reflection', duration: 3 },
        { title: 'Screen-free evening', description: 'Spend the last hour before bed without screens', type: 'habit', duration: 60 }
      ]},
      { title: 'Recovery Practices', description: 'Building stress recovery habits', week: 2, order: 2, tasks: [
        { title: 'Progressive relaxation', description: 'Full body progressive muscle relaxation', type: 'exercise', duration: 15 },
        { title: 'Nature time', description: 'Spend 15 minutes outdoors in nature', type: 'activity', duration: 15 },
        { title: 'Boundary practice', description: 'Practice saying no to one non-essential task', type: 'social', duration: 5 },
        { title: 'Evening reflection', description: 'Reflect on what drained vs. recharged you today', type: 'reflection', duration: 5 }
      ]},
      { title: 'Sleep Restoration', description: 'Improving sleep quality for stress recovery', week: 3, order: 3, tasks: [
        { title: 'Sleep schedule', description: 'Go to bed and wake up at consistent times', type: 'habit', duration: 5 },
        { title: '4-7-8 breathing', description: 'Practice before bed for sleep', type: 'breathing', duration: 5 },
        { title: 'Caffeine audit', description: 'No caffeine after 2 PM', type: 'habit', duration: 0 },
        { title: 'Gratitude journaling', description: 'Write three things you are grateful for before bed', type: 'journaling', duration: 5 }
      ]},
      { title: 'Time & Energy Management', description: 'Managing your resources better', week: 4, order: 4, tasks: [
        { title: 'Priority matrix', description: 'Categorize tasks by urgency and importance', type: 'planning', duration: 10 },
        { title: 'Mindful break', description: 'Take a 5-minute mindful pause between tasks', type: 'meditation', duration: 5 },
        { title: 'Exercise', description: '20 minutes of physical activity', type: 'exercise', duration: 20 },
        { title: 'Delegate or drop', description: 'Identify one task to delegate or remove', type: 'planning', duration: 5 }
      ]},
      { title: 'Building Resilience', description: 'Developing long-term stress resilience', week: 5, order: 5, tasks: [
        { title: 'Values check', description: 'Reflect on whether your activities align with your values', type: 'reflection', duration: 10 },
        { title: 'Support network', description: 'Connect with someone who supports you', type: 'social', duration: 15 },
        { title: 'Meditation', description: '10-minute guided meditation', type: 'meditation', duration: 10 },
        { title: 'Fun activity', description: 'Do something purely for enjoyment', type: 'activity', duration: 20 }
      ]},
      { title: 'Sustainable Calm', description: 'Creating your ongoing stress management plan', week: 6, order: 6, tasks: [
        { title: 'Progress review', description: 'Review your stress trends and improvements', type: 'reflection', duration: 10 },
        { title: 'Stress toolkit', description: 'Document your top 5 stress management techniques', type: 'planning', duration: 10 },
        { title: 'Future planning', description: 'Plan for ongoing stress management', type: 'planning', duration: 10 },
        { title: 'Celebration', description: 'Acknowledge your progress and growth', type: 'reflection', duration: 5 }
      ]}
    ]
  },
  'Sleep Restore': {
    track: 'Sleep Restore',
    durationWeeks: 4,
    focusAreas: ['Sleep quality', 'Bedtime routine', 'Sleep hygiene', 'Relaxation'],
    modules: [
      { title: 'Sleep Assessment', description: 'Understanding your current sleep patterns', week: 1, order: 1, tasks: [
        { title: 'Sleep diary', description: 'Record sleep and wake times, quality rating', type: 'check-in', duration: 3 },
        { title: 'Bedroom audit', description: 'Review your sleep environment (light, noise, temp)', type: 'habit', duration: 10 },
        { title: '4-7-8 breathing', description: 'Practice before bed', type: 'breathing', duration: 5 },
        { title: 'Screen curfew', description: 'No screens 30 minutes before bed', type: 'habit', duration: 0 }
      ]},
      { title: 'Building a Sleep Routine', description: 'Creating consistent sleep habits', week: 2, order: 2, tasks: [
        { title: 'Consistent schedule', description: 'Same bedtime and wake time daily', type: 'habit', duration: 0 },
        { title: 'Wind-down routine', description: 'Create a 30-minute pre-bed routine', type: 'habit', duration: 30 },
        { title: 'Body scan meditation', description: 'Practice in bed for relaxation', type: 'meditation', duration: 10 },
        { title: 'Caffeine tracking', description: 'No caffeine after noon', type: 'habit', duration: 0 }
      ]},
      { title: 'Advanced Sleep Techniques', description: 'Deeper strategies for better sleep', week: 3, order: 3, tasks: [
        { title: 'Stimulus control', description: 'Use bed only for sleep; leave if awake 20+ min', type: 'cbt', duration: 0 },
        { title: 'Relaxation practice', description: 'Progressive muscle relaxation before bed', type: 'exercise', duration: 15 },
        { title: 'Worry journaling', description: 'Write worries before bed to clear your mind', type: 'journaling', duration: 10 },
        { title: 'Exercise timing', description: 'Exercise at least 4 hours before bed', type: 'exercise', duration: 20 }
      ]},
      { title: 'Maintaining Good Sleep', description: 'Sustaining your improved sleep habits', week: 4, order: 4, tasks: [
        { title: 'Sleep review', description: 'Review your sleep diary trends', type: 'reflection', duration: 10 },
        { title: 'Routine reinforcement', description: 'Continue your bedtime routine', type: 'habit', duration: 30 },
        { title: 'Sleep toolkit', description: 'Document what works best for your sleep', type: 'planning', duration: 10 },
        { title: 'Future planning', description: 'Plan for maintaining good sleep long-term', type: 'planning', duration: 10 }
      ]}
    ]
  },
  'Balanced Wellness': {
    track: 'Balanced Wellness',
    durationWeeks: 6,
    focusAreas: ['Overall wellbeing', 'Mood', 'Stress', 'Habits', 'Self-care'],
    modules: [
      { title: 'Foundation', description: 'Establishing your wellness baseline', week: 1, order: 1, tasks: [
        { title: 'Daily mood check-in', description: 'Rate your mood and energy each morning', type: 'check-in', duration: 3 },
        { title: 'Box breathing', description: '5 minutes of calming breathing', type: 'breathing', duration: 5 },
        { title: 'Gentle movement', description: '15-minute walk or stretch', type: 'exercise', duration: 15 },
        { title: 'Gratitude note', description: 'Write one thing you are grateful for', type: 'journaling', duration: 3 }
      ]},
      { title: 'Mind', description: 'Cultivating mental clarity', week: 2, order: 2, tasks: [
        { title: 'Mindfulness practice', description: '5-minute mindfulness meditation', type: 'meditation', duration: 5 },
        { title: 'Thought awareness', description: 'Notice and name your emotions throughout the day', type: 'cbt', duration: 5 },
        { title: 'Digital detox', description: '1 hour without screens', type: 'habit', duration: 60 },
        { title: 'Journaling', description: 'Free-write about your day', type: 'journaling', duration: 10 }
      ]},
      { title: 'Body', description: 'Physical wellness habits', week: 3, order: 3, tasks: [
        { title: 'Exercise', description: '20 minutes of moderate activity', type: 'exercise', duration: 20 },
        { title: 'Hydration', description: 'Drink 8 glasses of water', type: 'habit', duration: 0 },
        { title: 'Sleep routine', description: 'Follow consistent sleep schedule', type: 'habit', duration: 0 },
        { title: 'Healthy meal', description: 'Prepare one nutritious meal', type: 'habit', duration: 20 }
      ]},
      { title: 'Connection', description: 'Nurturing relationships', week: 4, order: 4, tasks: [
        { title: 'Reach out', description: 'Contact one person you care about', type: 'social', duration: 10 },
        { title: 'Active listening', description: 'Practice fully listening in one conversation', type: 'social', duration: 10 },
        { title: 'Boundary setting', description: 'Practice setting one healthy boundary', type: 'social', duration: 5 },
        { title: 'Quality time', description: 'Spend uninterrupted time with someone', type: 'social', duration: 20 }
      ]},
      { title: 'Purpose', description: 'Connecting with meaning and values', week: 5, order: 5, tasks: [
        { title: 'Values reflection', description: 'Write about what matters most to you', type: 'reflection', duration: 10 },
        { title: 'Flow activity', description: 'Spend time on an activity that fully engages you', type: 'activity', duration: 20 },
        { title: 'Acts of kindness', description: 'Do something kind for someone', type: 'social', duration: 10 },
        { title: 'Vision journaling', description: 'Write about the life you want to build', type: 'journaling', duration: 10 }
      ]},
      { title: 'Integration', description: 'Bringing it all together', week: 6, order: 6, tasks: [
        { title: 'Progress review', description: 'Review all your trends and celebrate growth', type: 'reflection', duration: 15 },
        { title: 'Wellness plan', description: 'Create your ongoing daily wellness routine', type: 'planning', duration: 15 },
        { title: 'Support plan', description: 'Identify ongoing support resources', type: 'planning', duration: 10 },
        { title: 'Letter to self', description: 'Write a letter to your future self', type: 'journaling', duration: 15 }
      ]}
    ]
  }
};

/**
 * Generate a personalized plan based on assessment results, goals, and preferences.
 * THIS IS RULE-BASED. AI does NOT determine the plan.
 */
exports.generatePlan = (assessmentResults = [], goals = [], preferences = {}) => {
  const track = exports.getTrackForResults(assessmentResults, goals);
  const template = PLAN_TEMPLATES[track] || PLAN_TEMPLATES['Balanced Wellness'];

  const dailyMinutes = preferences.availableTime || 15;

  // Clone the template and adjust tasks based on available time
  const plan = JSON.parse(JSON.stringify(template));

  plan.dailyTimeCommitment = dailyMinutes;

  // Set initial module statuses
  plan.modules.forEach((mod, index) => {
    mod.status = index === 0 ? 'active' : 'locked';
    mod.tasks.forEach(task => {
      task.completed = false;
      task.completedAt = null;
    });

    // If user has limited time, reduce tasks
    if (dailyMinutes <= 5) {
      mod.tasks = mod.tasks.slice(0, 2);
    } else if (dailyMinutes <= 10) {
      mod.tasks = mod.tasks.slice(0, 3);
    }
  });

  return plan;
};

/**
 * Determine the best track based on assessment results and user goals.
 */
exports.getTrackForResults = (results = [], goals = []) => {
  // Check assessment results for highest severity
  const highSeverity = results.filter(r => r.riskLevel === 'high');
  const moderateSeverity = results.filter(r => r.riskLevel === 'moderate');

  // Priority: depression > anxiety > stress > sleep > balanced
  const hasDepression = results.some(r => r.assessmentId === 'PHQ-9' && (r.riskLevel === 'high' || r.riskLevel === 'moderate'));
  const hasAnxiety = results.some(r => r.assessmentId === 'GAD-7' && (r.riskLevel === 'high' || r.riskLevel === 'moderate'));
  const hasStress = results.some(r => r.assessmentId === 'PSS-10' && (r.riskLevel === 'high' || r.riskLevel === 'moderate'));
  const hasSleep = results.some(r => r.assessmentId === 'SLEEP' && (r.riskLevel === 'high' || r.riskLevel === 'moderate'));

  if (hasDepression && highSeverity.some(r => r.assessmentId === 'PHQ-9')) return 'Mood Lift';
  if (hasAnxiety && highSeverity.some(r => r.assessmentId === 'GAD-7')) return 'Anxiety Relief';
  if (hasStress) return 'Stress Reset';
  if (hasSleep) return 'Sleep Restore';
  if (hasDepression) return 'Mood Lift';
  if (hasAnxiety) return 'Anxiety Relief';

  // Fall back to goals
  if (goals.includes('Low mood')) return 'Mood Lift';
  if (goals.includes('Anxiety')) return 'Anxiety Relief';
  if (goals.includes('Stress')) return 'Stress Reset';
  if (goals.includes('Sleep')) return 'Sleep Restore';

  return 'Balanced Wellness';
};

exports.PLAN_TEMPLATES = PLAN_TEMPLATES;
