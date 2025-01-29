import { BedrockProvider } from '@agenite/bedrock';
import { OllamaProvider } from '@agenite/ollama';

const defaultProvider = 'ollama';
const defaultModel = 'llama3.2';

export const getLLMProvider = () => {
  // Get provider from env var or fallback to default
  const provider = process.env.LLM_PROVIDER?.toLowerCase() || defaultProvider;

  // Get model ID from env var or use provider-specific default
  const modelId = process.env.LLM_MODEL_ID || defaultModel;

  switch (provider) {
    case 'bedrock':
      return new BedrockProvider({
        model: modelId,
      });

    case 'ollama':
    default:
      return new OllamaProvider({
        model: modelId,
      });
  }
};

export const extractTextFromResponse = (response: any) => {
  return response.content[0]?.text || 'No response';
};

export * from './utils/print';
