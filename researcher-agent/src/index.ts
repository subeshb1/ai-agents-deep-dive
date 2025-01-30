import { createOrchestratorAgent } from './agents/orchestrator';
import { printMessage } from 'shared-llm-provider';

async function main() {
  const [topic, ...urls] = process.argv.slice(2);

  if (!topic || urls.length === 0) {
    console.log('Please provide a topic and at least one source URL');
    console.log('Usage: npm start "Topic" "https://source1.com" "https://source2.com" ...');
    process.exit(1);
  }

  try {
    const orchestrator = createOrchestratorAgent();
    const iterator = orchestrator.iterate({
      input: `Research and write a blog post about "${topic}" using these sources: ${urls.join(', ')}`,
      stream: true,
    });

    let response = await iterator.next();
    while (!response.done) {
      if (response.value.type === 'streaming' && response.value.response.type === 'text') {
        process.stdout.write(response.value.response.text);
      } else if (response.value.type === 'toolResult') {
        printMessage('toolResult', response.value.results.map((r) => r.result));
      }
      response = await iterator.next();
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
