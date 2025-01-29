import chalk from 'chalk';
import { BaseMessage, ContentBlock } from '@agenite/llm';

const icons = {
  user: '👤',
  assistant: '🤖',
  tool: '🔧',
  toolResult: '📊',
  system: '⚙️',
} as const;

export function printMessage(role: string, content: string | ContentBlock[]) {
  const icon = icons[role as keyof typeof icons] || '❓';
  
  console.log(`\n${icon} ${chalk.bold(role.toUpperCase())}`);
  console.log('───────────────────');
  
  if (typeof content === 'string') {
    console.log(chalk.white(content));
  } else {
    content.forEach((block) => {
      if (block.type === 'text') {
        console.log(chalk.white(block.text));
      } else if (block.type === 'toolUse') {
        console.log(chalk.yellow(`Using tool: ${block.name}`));
        if ('args' in block) {
          console.log(chalk.gray(JSON.stringify(block.args, null, 2)));
        }
      } else if (block.type === 'toolResult') {
        console.log(chalk.green(`Tool Result (${block.toolName}):`));
        console.log(chalk.cyan(JSON.stringify(block.content, null, 2)));
      }
    });
  }
}

export function printSystemInfo(message: string) {
  console.log(`\n${icons.system} ${chalk.gray(message)}`);
}

export function printSeparator() {
  console.log('\n' + chalk.gray('─'.repeat(50)) + '\n');
} 
