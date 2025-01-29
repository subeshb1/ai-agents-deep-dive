import { getLLMProvider, printMessage, printSystemInfo, printSeparator } from 'shared-llm-provider';

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

async function toolUseExample(prompt: string) {
  printMessage('user', prompt);

  const provider = getLLMProvider();

  const systemPrompt = 'You are a helpful assistant. Use the tools when needed.';
  printSystemInfo(systemPrompt);

  const response = await provider.generate(prompt, {
    systemPrompt,
    tools,
  });

  printMessage('assistant', response.content);
  
  const hasToolUse = response.content.find((block) => block.type === 'toolUse');

  if (hasToolUse) {
    const tool = tools.find((tool) => tool.name === hasToolUse.name);
    const toolResult = tool?.execute();
    printMessage('toolResult', [
      {
        type: 'toolResult',
        toolName: hasToolUse.name,
        toolUseId: hasToolUse.id,
        content: toolResult
      }
    ]);
  }
}

async function main() {
  await toolUseExample('What time is it right now?');
  printSeparator();
  await toolUseExample('What is the weather like right now?');
}

main().catch(console.error);
