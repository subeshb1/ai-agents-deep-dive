import { getLLMProvider, printMessage, printSystemInfo, printSeparator } from 'shared-llm-provider';
import { BaseMessage } from '@agenite/llm';

async function main() {
  const provider = getLLMProvider();

  // First query with system context
  const systemPrompt =
    'You are professional javascript developer. You are given a task and you need to complete it.';
  
  printSystemInfo(systemPrompt);

  const messages: BaseMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Hi there, what can you do?',
        },
      ],
    },
  ];

  printMessage('user', 'Hi there, what can you do?');

  const response = await provider.generate(messages, {
    systemPrompt: systemPrompt,
  });

  printMessage('assistant', response.content);
  
  printSeparator();
  printMessage('system', `Stop Reason: ${response.stopReason}`);
  printMessage('system', `Token Usage: ${JSON.stringify(response.tokens, null, 2)}`);
}

main().catch(console.error);
