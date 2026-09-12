const standardOptions = [
  { text: 'Not at all', score: 0 },
  { text: 'Several days', score: 1 },
  { text: 'More than half the days', score: 2 },
  { text: 'Nearly every day', score: 3 }
];

const stressOptions = [
  { text: 'Never', score: 0 },
  { text: 'Almost Never', score: 1 },
  { text: 'Sometimes', score: 2 },
  { text: 'Fairly Often', score: 3 },
  { text: 'Very Often', score: 4 }
];

const stressOptionsReverse = [
  { text: 'Never', score: 4 },
  { text: 'Almost Never', score: 3 },
  { text: 'Sometimes', score: 2 },
  { text: 'Fairly Often', score: 1 },
  { text: 'Very Often', score: 0 }
];

module.exports = [
  {
    assessmentId: 'PHQ-9',
    name: 'Patient Health Questionnaire-9',
    description: 'A clinically validated tool for screening and measuring the severity of depression.',
    type: 'depression',
    instructions: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    timeEstimate: '3-5 minutes',
    questions: [
      { text: 'Little interest or pleasure in doing things', options: standardOptions, riskFlags: [] },
      { text: 'Feeling down, depressed, or hopeless', options: standardOptions, riskFlags: [] },
      { text: 'Trouble falling or staying asleep, or sleeping too much', options: standardOptions, riskFlags: [] },
      { text: 'Feeling tired or having little energy', options: standardOptions, riskFlags: [] },
      { text: 'Poor appetite or overeating', options: standardOptions, riskFlags: [] },
      { text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', options: standardOptions, riskFlags: [] },
      { text: 'Trouble concentrating on things, such as reading the newspaper or watching television', options: standardOptions, riskFlags: [] },
      { text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', options: standardOptions, riskFlags: [] },
      { text: 'Thoughts that you would be better off dead, or of hurting yourself in some way', options: standardOptions, riskFlags: [
        { optionScore: 1, flag: 'suicide_ideation' },
        { optionScore: 2, flag: 'suicide_ideation' },
        { optionScore: 3, flag: 'suicide_ideation' }
      ]}
    ],
    scoringRules: [
      { minScore: 0, maxScore: 4, severity: 'Minimal', riskLevel: 'low', description: 'Your responses suggest minimal symptoms of depression.' },
      { minScore: 5, maxScore: 9, severity: 'Mild', riskLevel: 'low', description: 'Your responses suggest mild symptoms of depression. Monitoring and self-care recommended.' },
      { minScore: 10, maxScore: 14, severity: 'Moderate', riskLevel: 'moderate', description: 'Your responses suggest moderate symptoms of depression. Consider speaking with a professional.' },
      { minScore: 15, maxScore: 19, severity: 'Moderately Severe', riskLevel: 'high', description: 'Your responses suggest moderately severe symptoms. Professional support is recommended.' },
      { minScore: 20, maxScore: 27, severity: 'Severe', riskLevel: 'high', description: 'Your responses suggest severe symptoms. Please seek professional support.' }
    ],
    maxScore: 27
  },
  {
    assessmentId: 'GAD-7',
    name: 'Generalized Anxiety Disorder-7',
    description: 'A clinically validated tool for screening and measuring the severity of anxiety.',
    type: 'anxiety',
    instructions: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    timeEstimate: '2-4 minutes',
    questions: [
      { text: 'Feeling nervous, anxious, or on edge', options: standardOptions, riskFlags: [] },
      { text: 'Not being able to stop or control worrying', options: standardOptions, riskFlags: [] },
      { text: 'Worrying too much about different things', options: standardOptions, riskFlags: [] },
      { text: 'Trouble relaxing', options: standardOptions, riskFlags: [] },
      { text: 'Being so restless that it\'s hard to sit still', options: standardOptions, riskFlags: [] },
      { text: 'Becoming easily annoyed or irritable', options: standardOptions, riskFlags: [] },
      { text: 'Feeling afraid, as if something awful might happen', options: standardOptions, riskFlags: [] }
    ],
    scoringRules: [
      { minScore: 0, maxScore: 4, severity: 'Minimal', riskLevel: 'low', description: 'Your responses suggest minimal symptoms of anxiety.' },
      { minScore: 5, maxScore: 9, severity: 'Mild', riskLevel: 'low', description: 'Your responses suggest mild anxiety. Self-care strategies may help.' },
      { minScore: 10, maxScore: 14, severity: 'Moderate', riskLevel: 'moderate', description: 'Your responses suggest moderate anxiety. Consider speaking with a professional.' },
      { minScore: 15, maxScore: 21, severity: 'Severe', riskLevel: 'high', description: 'Your responses suggest severe anxiety. Professional support is recommended.' }
    ],
    maxScore: 21
  },
  {
    assessmentId: 'PSS-10',
    name: 'Perceived Stress Scale-10',
    description: 'Measures the degree to which situations in your life are appraised as stressful.',
    type: 'stress',
    instructions: 'In the last month, how often have you...',
    timeEstimate: '3-5 minutes',
    questions: [
      { text: 'Been upset because of something that happened unexpectedly', options: stressOptions, riskFlags: [] },
      { text: 'Felt that you were unable to control the important things in your life', options: stressOptions, riskFlags: [] },
      { text: 'Felt nervous and stressed', options: stressOptions, riskFlags: [] },
      { text: 'Felt confident about your ability to handle your personal problems', options: stressOptionsReverse, riskFlags: [] },
      { text: 'Felt that things were going your way', options: stressOptionsReverse, riskFlags: [] },
      { text: 'Found that you could not cope with all the things that you had to do', options: stressOptions, riskFlags: [] },
      { text: 'Been able to control irritations in your life', options: stressOptionsReverse, riskFlags: [] },
      { text: 'Felt that you were on top of things', options: stressOptionsReverse, riskFlags: [] },
      { text: 'Been angered because of things that were outside of your control', options: stressOptions, riskFlags: [] },
      { text: 'Felt difficulties were piling up so high that you could not overcome them', options: stressOptions, riskFlags: [] }
    ],
    scoringRules: [
      { minScore: 0, maxScore: 13, severity: 'Low Stress', riskLevel: 'low', description: 'Your stress levels appear manageable.' },
      { minScore: 14, maxScore: 26, severity: 'Moderate Stress', riskLevel: 'moderate', description: 'You are experiencing moderate stress. Focus on stress reduction strategies.' },
      { minScore: 27, maxScore: 40, severity: 'High Stress', riskLevel: 'high', description: 'Your stress levels are high. Please consider professional support and stress management techniques.' }
    ],
    maxScore: 40
  },
  {
    assessmentId: 'SLEEP',
    name: 'Sleep Quality Assessment',
    description: 'Evaluates your sleep patterns and overall sleep quality.',
    type: 'sleep',
    instructions: 'Please answer the following questions about your sleep habits over the past two weeks.',
    timeEstimate: '2-3 minutes',
    questions: [
      { text: 'How often have you had difficulty falling asleep?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you woken up during the night and had difficulty going back to sleep?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you woken up too early in the morning?', options: standardOptions, riskFlags: [] },
      { text: 'How would you rate your overall sleep quality?', options: [
        { text: 'Very good', score: 0 }, { text: 'Fairly good', score: 1 },
        { text: 'Fairly bad', score: 2 }, { text: 'Very bad', score: 3 }
      ], riskFlags: [] },
      { text: 'How often have you felt tired or low on energy during the day due to poor sleep?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you used screens (phone, tablet, computer) in bed before sleeping?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you consumed caffeine or stimulants within 4 hours of bedtime?', options: standardOptions, riskFlags: [] },
      { text: 'How often has your sleep schedule been inconsistent (varying bedtimes or wake times)?', options: standardOptions, riskFlags: [] }
    ],
    scoringRules: [
      { minScore: 0, maxScore: 7, severity: 'Good Sleep', riskLevel: 'low', description: 'Your sleep patterns appear healthy.' },
      { minScore: 8, maxScore: 15, severity: 'Fair Sleep', riskLevel: 'moderate', description: 'Your sleep could benefit from improved habits.' },
      { minScore: 16, maxScore: 24, severity: 'Poor Sleep', riskLevel: 'high', description: 'Your sleep quality is concerning. Consider addressing sleep hygiene.' }
    ],
    maxScore: 24
  },
  {
    assessmentId: 'DIGITAL',
    name: 'Digital Wellness Assessment',
    description: 'Evaluates the impact of digital habits and social media on your wellbeing.',
    type: 'digital_stress',
    instructions: 'Please answer the following questions about your digital habits over the past two weeks.',
    timeEstimate: '2-3 minutes',
    questions: [
      { text: 'How often have you felt anxious when you could not check your phone or social media?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you spent more time on screens than you intended?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you felt worse about yourself after using social media?', options: standardOptions, riskFlags: [] },
      { text: 'How often has screen time interfered with your sleep?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you felt the need to constantly check notifications?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you neglected real-life activities or relationships because of screen time?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you compared yourself to others on social media?', options: standardOptions, riskFlags: [] },
      { text: 'How often have you felt drained or exhausted after extended screen time?', options: standardOptions, riskFlags: [] }
    ],
    scoringRules: [
      { minScore: 0, maxScore: 7, severity: 'Healthy Digital Habits', riskLevel: 'low', description: 'Your digital habits appear balanced.' },
      { minScore: 8, maxScore: 15, severity: 'Moderate Digital Stress', riskLevel: 'moderate', description: 'Your digital habits may be affecting your wellbeing.' },
      { minScore: 16, maxScore: 24, severity: 'High Digital Stress', riskLevel: 'high', description: 'Your digital habits are significantly impacting your wellbeing.' }
    ],
    maxScore: 24
  }
];
