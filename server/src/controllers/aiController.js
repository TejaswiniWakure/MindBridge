const { generateWellbeingAdvice } = require('../services/aiService');

// @desc    Get AI mental wellbeing advice
// @route   POST /api/ai/chat
// @access  Private
exports.chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const advice = await generateWellbeingAdvice(message, history);

    res.status(200).json({
      success: true,
      response: advice
    });
  } catch (error) {
    console.error('AI chat controller error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to process AI chat message' });
  }
};
