/**
 * Triage Service — Deterministic assessment assignment engine.
 * AI does NOT control this logic. Scoring and assignment are rule-based.
 */

/**
 * Evaluate triage symptom responses and assign appropriate assessments.
 * @param {Array} symptomResponses - [{question, answer (0-3)}]
 * @param {Array} problemAreas - ['Low mood', 'Anxiety', ...]
 * @param {Array} safetyResponses - [{question, answer (0-3)}]
 * @returns {Object} { assignedAssessments, suicideRisk, riskDetails }
 */
exports.evaluateTriage = (symptomResponses, problemAreas = [], safetyResponses = []) => {
  const assigned = new Set();
  const riskDetails = [];

  // Symptom mapping (indices correspond to triage questions):
  // 0: feeling down/depressed  → depression
  // 1: little interest/pleasure → depression
  // 2: nervous/anxious → anxiety
  // 3: uncontrollable worry → anxiety
  // 4: constant pressure/stress → stress

  const depressionScore = (symptomResponses[0]?.answer || 0) + (symptomResponses[1]?.answer || 0);
  const anxietyScore = (symptomResponses[2]?.answer || 0) + (symptomResponses[3]?.answer || 0);
  const stressScore = symptomResponses[4]?.answer || 0;

  // Depression indicators
  if (depressionScore >= 2) {
    assigned.add('PHQ-9');
    riskDetails.push('Depression symptoms detected — PHQ-9 assigned.');
  }

  // Anxiety indicators
  if (anxietyScore >= 2) {
    assigned.add('GAD-7');
    riskDetails.push('Anxiety symptoms detected — GAD-7 assigned.');
  }

  // Stress indicators
  if (stressScore >= 2) {
    assigned.add('PSS-10');
    riskDetails.push('Elevated stress detected — PSS-10 assigned.');
  }

  // Problem area based assignment
  if (problemAreas.includes('Low mood') || problemAreas.includes('Fatigue')) {
    assigned.add('PHQ-9');
  }
  if (problemAreas.includes('Anxiety') || problemAreas.includes('Panic')) {
    assigned.add('GAD-7');
  }
  if (problemAreas.includes('Stress')) {
    assigned.add('PSS-10');
  }
  if (problemAreas.includes('Sleep')) {
    assigned.add('SLEEP');
    riskDetails.push('Sleep concerns — Sleep Assessment assigned.');
  }
  if (problemAreas.includes('Phone/social-media stress') || problemAreas.includes('Digital stress')) {
    assigned.add('DIGITAL');
    riskDetails.push('Digital stress concerns — Digital Stress Assessment assigned.');
  }

  // If nothing was assigned, give a baseline set
  if (assigned.size === 0) {
    assigned.add('PHQ-9');
    assigned.add('GAD-7');
    riskDetails.push('Baseline assessments assigned.');
  }

  // Safety check
  const safetyResult = exports.checkSafetyRisk(safetyResponses);

  return {
    assignedAssessments: Array.from(assigned),
    suicideRisk: safetyResult.level,
    riskDetails: [...riskDetails, ...safetyResult.details]
  };
};

/**
 * Evaluate safety questions for suicide/self-harm risk.
 * THIS IS DETERMINISTIC. AI does NOT control this.
 */
exports.checkSafetyRisk = (safetyResponses = []) => {
  // Safety question indices:
  // 0: thoughts of being better off dead
  // 1: thoughts of self-harm

  const q1Score = safetyResponses[0]?.answer || 0;
  const q2Score = safetyResponses[1]?.answer || 0;

  const details = [];

  if (q1Score >= 2 || q2Score >= 2) {
    details.push('CRITICAL: Significant self-harm or suicidal ideation reported.');
    return { level: 'high', details };
  }

  if (q1Score >= 1 || q2Score >= 1) {
    details.push('Mild self-harm or suicidal ideation reported. Monitor closely.');
    return { level: 'moderate', details };
  }

  return { level: 'none', details: ['No safety concerns identified.'] };
};
