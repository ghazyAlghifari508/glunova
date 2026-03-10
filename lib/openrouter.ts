import { createOpenAI } from '@ai-sdk/openai';

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
if (!openRouterApiKey) {
  console.warn('OPENROUTER_API_KEY is missing. AI features will be unavailable until configured.');
}

export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: openRouterApiKey || '',
  headers: {
    'HTTP-Referer': 'https://glunova.vercel.app',
    'X-Title': 'BunGlunova App',
  },
});
