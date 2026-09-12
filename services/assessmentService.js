/**
 * Assessment Scoring Service — DETERMINISTIC, rule-based.
 * AI does NOT control scoring. This is validated clinical logic.
 */

/**
 * Score an assessment based on responses and assessment definition.
 * @param {Object} assessmentDef - Assessment definition from DB
 * @param {Array} responses - [{questionIndex, selectedOptionIndex, score}]
 * @returns {Object} { totalScore, maxScore, severity, riskLevel, riskFlags, description }
 */
exports.scoreAssessment = (assessmentDef, responses) => {
  let totalScore = 0;
  const riskFlags = [];

  responses.forEach(response => {
    totalScore += response.score || 0;

    // Check for risk flags on this question
    const question = assessmentDef.questions[response.questionIndex];
    if (question && question.riskFlags) {
      question.riskFlags.forEach(rf => {
        if (response.score >= rf.optionScore) {
          riskFlags.push(rf.flag);
        }
      });
    }
  });

  // Determine severity and risk level from scoring rules
  let severity = 'Unknown';
  let riskLevel = 'low';
  let description = '';

  for (const rule of assessmentDef.scoringRules) {
    if (totalScore >= rule.minScore && totalScore <= rule.maxScore) {
      severity = rule.severity;
      riskLevel = rule.riskLevel;
      description = rule.description || '';
      break;
    }
  }

  return {
    totalScore,
    maxScore: assessmentDef.maxScore,
    severity,
    riskLevel,
    riskFlags: [...new Set(riskFlags)],
    description
  };
};

/**
 * Evaluate whether assessment results indicate elevated risk.
 * @param {String} riskLevel - From scoring
 * @param {Array} riskFlags - Any triggered risk flags
 * @returns {Object} { isHighRisk, reason }
 */
exports.evaluateRisk = (riskLevel, riskFlags) => {
  if (riskFlags.includes('suicide_ideation')) {
    return { isHighRisk: true, reason: 'Suicidal ideation detected in assessment response.' };
  }

  if (riskLevel === 'high') {
    return { isHighRisk: true, reason: 'Assessment score indicates high severity.' };
  }

  return { isHighRisk: false, reason: null };
};
