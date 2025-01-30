import { Agent } from '@agenite/agent';
import { getLLMProvider, printMessage } from 'shared-llm-provider';
import { createFileSystemTool } from './tools/file-system';
import { createCommandRunnerTool } from './tools/command-runner';

export async function runAgent(userInput: string) {
  const systemPrompt = `You are an expert coding assistant. Your task is to help users with coding tasks by:
1. Reading and analyzing code files
2. Finding functions and imports
3. Making code modifications when requested
4. Providing explanations and suggestions
6. If you need to run multiple tools, you can do so by running the tools in sequence.

Always explain your thought process before taking actions.
`;

  const provider = getLLMProvider();

  const agent = new Agent({
    name: 'CodingAgent',
    description: 'An AI agent specialized in coding tasks',
    provider,
    systemPrompt,

    tools: [createFileSystemTool(), createCommandRunnerTool()],
  });

  const iterator = agent.iterate({
    input: userInput,
    stream: true,
  });

  let response = await iterator.next();

  while (!response.done) {
    switch (response.value.type) {
      case 'streaming':
        if (response.value.response.type === 'text') {
          process.stdout.write(response.value.response.text);
        } else {
          printMessage('tool', [response.value.response.toolUse]);
        }

        break;

      case 'toolResult':
        printMessage(
          'toolResult',
          response.value.results.map((r) => r.result)
        );
        break;
    }
    response = await iterator.next();
  }

  printMessage('assistant', JSON.stringify(response, null, 2));
}
