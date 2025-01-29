import { Agent } from '@agenite/agent';
import {
  getLLMProvider,
  printMessage,
  printSystemInfo,
} from 'shared-llm-provider';
import {
  readFileTool,
  writeFileTool,
  listDirectoryTool,
} from './tools/file-system';
import { findFunctionsTool, findImportsTool } from './tools/code-analysis';

const systemPrompt = `You are an expert coding assistant. Your task is to help users with coding tasks by:
1. Reading and analyzing code files
2. Finding functions and imports
3. Making code modifications when requested
4. Providing explanations and suggestions

Always explain your thought process before taking actions.`;

export function createCodingAgent() {
  const provider = getLLMProvider();

  return new Agent({
    name: 'CodingAgent',
    description: 'An AI agent specialized in coding tasks',
    provider,
    systemPrompt,
    tools: [
      readFileTool,
      writeFileTool,
      listDirectoryTool,
      findFunctionsTool,
      findImportsTool,
    ],
  });
}

export async function runAgent(userInput: string) {
  const agent = createCodingAgent();

  printSystemInfo(systemPrompt);
  printMessage('user', userInput);

  const response = await agent.execute({
    input: userInput,
  });

  printMessage('assistant', JSON.stringify(response, null, 2));
}
