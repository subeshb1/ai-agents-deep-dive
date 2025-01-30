import { Tool, ToolResponse } from '@agenite/tool';
import * as fs from 'fs/promises';
import * as path from 'path';

interface BlogWriterParams {
  title: string;
  content: string;
  outputPath?: string;
}

export function createBlogWriterTool(): Tool<BlogWriterParams> {
  return new Tool({
    name: 'blog_writer',
    description: 'Writes blog content to a markdown file with proper formatting',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the blog post',
        },
        content: {
          type: 'string',
          description: 'The content to write to the blog post',
        },
        outputPath: {
          type: 'string',
          description: 'Optional custom output path for the blog post',
        },
      },
      required: ['title', 'content'],
    },

    async execute({ input }) {
      try {
        const { title, content, outputPath } = input;
        
        // Create blog directory if it doesn't exist
        const blogDir = outputPath || path.join(process.cwd(), 'blogs');
        await fs.mkdir(blogDir, { recursive: true });

        // Create filename from title
        const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
        const filepath = path.join(blogDir, filename);

        // Format the blog post in markdown
        const date = new Date().toISOString().split('T')[0];
        const blogContent = `---
title: ${title}
date: ${date}
---

${content}`;

        // Write to file
        await fs.writeFile(filepath, blogContent, 'utf-8');

        return {
          success: true,
          data: `Blog post written successfully to ${filepath}`,
          duration: 0,
        };
      } catch (error) {
        return {
          success: false,
          data: '',
          error: {
            code: 'BLOG_WRITE_ERROR',
            message: error instanceof Error ? error.message : 'An unknown error occurred while writing the blog post',
          },
          duration: 0,
        };
      }
    },
  });
} 
