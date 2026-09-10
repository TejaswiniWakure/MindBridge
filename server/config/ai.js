module.exports = {
  provider: process.env.LLM_PROVIDER || 'mock',
  openaiApiKey: process.env.OPENAI_API_KEY,
  embeddingProvider: process.env.EMBEDDING_PROVIDER || 'mock',
  embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-3-small'
};
