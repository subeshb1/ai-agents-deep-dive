import { Agent } from '@agenite/agent';
import { getLLMProvider } from 'shared-llm-provider';
import { createResearcherAgent } from './researcher';
import { createBlogWriterAgent } from './blog-writer';

export function createOrchestratorAgent(): Agent {
  const systemPrompt = `You are an expert content creation orchestrator. Your task is to:
1. Use the researcher agent to gather information from multiple sources
2. Combine and synthesize the research data
3. Use the blog writer agent to create a well-structured blog post
4. Ensure the content flows naturally and maintains coherence

To accomplish this:
1. First use the researcher agent for each URL to gather information
2. Then use the researcher agent again to synthesize all the gathered information
3. Finally use the blog writer agent to create the final post

Always ensure the content is:
- Well-researched and accurate
- Properly structured
- Engaging and informative
- Formatted cleanly in markdown
`;

  const provider = getLLMProvider();
  const researcherAgent = createResearcherAgent();
  const blogWriterAgent = createBlogWriterAgent();

  return new Agent({
    name: 'OrchestratorAgent',
    description: 'An AI agent that orchestrates research and blog writing',
    provider,
    systemPrompt,
    tools: [researcherAgent, blogWriterAgent],
  });
} 
