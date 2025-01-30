import { Agent } from '@agenite/agent';
import { getLLMProvider } from 'shared-llm-provider';
import { createWebScraperTool } from '../tools/web-scraper';

export function createResearcherAgent(): Agent {
  const systemPrompt = `You are an expert researcher. Your task is to:
1. Extract relevant information about the topic from the provided URL
2. Analyze and organize the information
3. Identify key insights and important points
4. Structure the research in a clear format

Always ensure to:
- Focus on relevant information
- Maintain accuracy
- Organize content logically
- Highlight key findings
`;

  const provider = getLLMProvider();

  return new Agent({
    name: 'ResearcherAgent',
    description: 'An AI agent specialized in web research',
    provider,
    systemPrompt,
    tools: [createWebScraperTool()],
  });
} 
