import { getLLMProvider, printMessage, printSystemInfo, printSeparator } from 'shared-llm-provider';
import { BaseMessage } from '@agenite/llm';

// Example tool that gets current time
const getCurrentTime = () => new Date().toLocaleTimeString();
const getWeather = () => 'The weather is sunny';

// Tool definitions
const tools = [
  {
    name: 'getCurrentTime',
    description: 'Get the current time',
    execute: getCurrentTime,
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'getWeather',
    description: 'Get the current weather',
    execute: getWeather,
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
];

async function simpleAgent(prompt: string) {
  const provider = getLLMProvider();

  const systemPrompt = `You are a helpful assistant. You are given a task and you need to complete it.\n\n`;
  printSystemInfo(systemPrompt);

  let stopReason;

  let messages: BaseMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: prompt,
        },
      ],
    },
  ];

  printMessage('user', prompt);

  while (stopReason !== 'endTurn') {
    // Get initial response
    const response = await provider.generate(messages, {
      systemPrompt: systemPrompt,
      tools,
    });

    messages.push({
      role: 'assistant',
      content: response.content,
    });

    printMessage('assistant', response.content);
    printMessage('system', `Stop Reason: ${response.stopReason}`);
    printMessage('system', `Token Usage: ${JSON.stringify(response.tokens, null, 2)}`);

    if (response.stopReason === 'toolUse') {
      const toolUse = response.content.filter(
        (content) => content.type === 'toolUse'
      );

      if (toolUse.length > 0) {
        const toolResults = toolUse.map((tool) => {
          const toolDef = tools.find((t) => t.name === tool.name);
          const result = toolDef?.execute();

          return {
            type: 'toolResult',
            toolUseId: tool.id,
            toolName: tool.name,
            content: result,
          } as const;
        });

        printMessage('toolResult', toolResults);
        messages.push({
          role: 'user',
          content: toolResults,
        });
      }
    }

    stopReason = response.stopReason;
  }
}

async function main() {
  await simpleAgent('What\'s the weather like today and what time is it?');
}

main().catch(console.error);
