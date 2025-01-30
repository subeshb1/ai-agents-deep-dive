import { BedrockProvider } from '@agenite/bedrock';
import { OllamaProvider } from '@agenite/ollama';

const defaultProvider = 'ollama';
const defaultModel = 'llama3.2';

export const getLLMProvider = () => {
  // Get provider from env var or fallback to default
  const provider = process.env.LLM_PROVIDER?.toLowerCase() || defaultProvider;

  // Get model ID from env var or use provider-specific default
  let modelId = process.env.LLM_MODEL_ID;

  switch (provider) {
    case 'bedrock':
      modelId = modelId || 'anthropic.claude-3-5-haiku-20241022-v1:0';
      return new BedrockProvider({
        model: modelId,
        region: 'us-west-2',
      });

    case 'ollama':
    default:
      modelId = modelId || 'llama3.2';
      return new OllamaProvider({
        model: modelId,
      });
  }
};

export const extractTextFromResponse = (response: any) => {
  return response.content[0]?.text || 'No response';
};

export * from './utils/print';
