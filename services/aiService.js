const config = require('../config/ai');
exports.generateResponse = async (prompt, systemPrompt) => {
  if (config.provider === 'mock') {
    return "This is a mock AI response.";
  }
  return "AI Response";
};
exports.generateEmbedding = async (text) => {
  if (config.embeddingProvider === 'mock') {
    return Array(1536).fill(0);
  }
  return Array(1536).fill(0);
};
