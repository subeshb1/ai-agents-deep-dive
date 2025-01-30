import { Agent } from '@agenite/agent';
import { getLLMProvider } from 'shared-llm-provider';
import { createBlogWriterTool } from '../tools/blog-writer';

export function createBlogWriterAgent(): Agent {
  const systemPrompt = `You are an expert blog writer. Your task is to:
1. Analyze the research data provided
2. Create a well-structured blog post
3. Include proper headings and sections
4. Make the content engaging and informative
5. Format everything in clean markdown

Always follow these writing guidelines:
- Start with a compelling introduction
- Use clear section headings
- Include relevant examples and insights
- End with a strong conclusion
- Keep paragraphs concise and readable
`;

  const provider = getLLMProvider();

  return new Agent({
    name: 'BlogWriterAgent',
    description: 'An AI agent specialized in writing blog posts',
    provider,
    systemPrompt,
    tools: [createBlogWriterTool()],
  });
} 
