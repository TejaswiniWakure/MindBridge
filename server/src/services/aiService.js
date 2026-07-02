const axios = require('axios');

/**
 * Handles communication with Gemini API or falls back to rules-based therapist advice.
 */
const generateWellbeingAdvice = async (message, history = []) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return getFallbackResponse(message);
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a compassionate, professional mental wellness assistant named MindWell AI.
                  Your goal is to provide supportive, non-diagnostic guidance, coping mechanisms, and mindful breathing exercises.
                  If the user expresses severe distress or self-harm, gently encourage them to contact immediate professional help (such as a suicide helpline) and state clearly that you are an AI, not a clinical doctor.
                  
                  User message: "${message}"`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return text;
    }
    
    return getFallbackResponse(message);
  } catch (error) {
    console.error('Gemini API execution error:', error.message);
    return getFallbackResponse(message);
  }
};

const getFallbackResponse = (message) => {
  const msgLower = message.toLowerCase();
  
  if (msgLower.includes('sad') || msgLower.includes('depress') || msgLower.includes('cry')) {
    return "I'm sorry to hear you're feeling down. Remember that it's okay to experience these emotions. Try a simple grounding technique: Name 5 things you can see around you, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Taking it one breath at a time helps.";
  }
  
  if (msgLower.includes('anxious') || msgLower.includes('worry') || msgLower.includes('stress') || msgLower.includes('panic')) {
    return "It sounds like you're experiencing a lot of pressure right now. Let's do a quick breathing exercise together: Inhale slowly for 4 seconds, hold your breath for 4 seconds, exhale gently for 4 seconds, and rest for 4 seconds. Repeat this box breathing pattern 3 times to help calm your nervous system.";
  }

  if (msgLower.includes('hello') || msgLower.includes('hi ')) {
    return "Hello! I am MindWell AI, your personal mental wellbeing assistant. How are you feeling today? Feel free to write about your day or express any emotions you're experiencing.";
  }

  return "Thank you for sharing that with me. Your feelings are valid. Journaling your thoughts is a great way to process them. What other details about this situation stand out to you, or how does it make you feel physically?";
};

module.exports = {
  generateWellbeingAdvice
};
