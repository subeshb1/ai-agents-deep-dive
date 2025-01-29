import { runAgent } from './agent';

async function main() {
  // Example usage
  await runAgent('Can you analyze the code in src/agent.ts and tell me what functions it contains?');
}

main().catch(console.error); 
