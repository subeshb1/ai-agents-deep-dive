import { Tool, ToolResponse } from '@agenite/tool';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface WebScraperParams {
  url: string;
}

export function createWebScraperTool(): Tool<WebScraperParams> {
  return new Tool({
    name: 'web_scraper',
    description:
      'Scrapes content from a webpage and extracts important information',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The URL of the webpage to scrape',
        },
      },
      required: ['url'],
    },

    async execute({ input }) {
      try {
        const { url } = input;
        // Fetch the webpage
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Remove unnecessary elements
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('footer').remove();
        $('header').remove();
        $('aside').remove();
        $('iframe').remove();

        // Extract main content
        const mainContent: string[] = [];

        // Get title
        const title = $('title').text().trim();
        if (title) mainContent.push(`Title: ${title}\n`);

        // Get meta description
        const metaDescription = $('meta[name="description"]').attr('content');
        if (metaDescription)
          mainContent.push(`Description: ${metaDescription}\n`);

        // Get main content from article or main tags
        $('article, main, .content, .main-content').each((_, element) => {
          const text = $(element).text().trim();
          if (text) mainContent.push(text);
        });

        // If no specific content containers found, get paragraphs
        if (mainContent.length <= 2) {
          $('p').each((_, element) => {
            const text = $(element).text().trim();
            if (text.length > 50) mainContent.push(text); // Only include substantial paragraphs
          });
        }

        // Get headings
        $('h1, h2, h3').each((_, element) => {
          const text = $(element).text().trim();
          if (text) mainContent.push(`Heading: ${text}`);
        });

        return {
          success: true,
          data: mainContent.join('\n\n'),
          duration: 0,
        };
      } catch (error) {
        return {
          success: false,
          data: '',
          error: {
            code: 'SCRAPING_ERROR',
            message:
              error instanceof Error
                ? error.message
                : 'An unknown error occurred while scraping the webpage',
          },
          duration: 0,
        };
      }
    },
  });
}
