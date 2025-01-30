# AI Research & Blog Writing Agent

An AI-powered system that automatically researches topics from multiple sources and generates well-structured blog posts. This project demonstrates the power of composable AI agents working together to accomplish complex tasks.

## Features

- 🔍 **Multi-Source Research**: Scrapes and analyzes content from multiple URLs
- 🤝 **Agent Collaboration**: Uses multiple specialized agents working together
- 📝 **Automated Blog Writing**: Generates well-structured markdown blog posts
- 🔄 **Content Synthesis**: Combines and synthesizes information from multiple sources
- ✨ **Clean Output**: Produces properly formatted markdown files

## Architecture

The system uses three specialized agents working together:

### 1. Researcher Agent
- Scrapes web content using Cheerio
- Extracts relevant information
- Analyzes and organizes research data
- Can synthesize information from multiple sources

### 2. Blog Writer Agent
- Creates well-structured blog posts
- Formats content in clean markdown
- Handles proper blog post organization
- Creates engaging and informative content

### 3. Orchestrator Agent
- Coordinates the research and writing process
- Uses other agents as tools
- Ensures content quality and coherence
- Manages the overall workflow

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd researcher-agent

# Install dependencies
npm install
```

## Usage

Run the agent with a topic and one or more source URLs:

```bash
npm start "Your Topic" "https://source1.com" "https://source2.com" "https://source3.com"
```

Example:
```bash
npm start "AI Agents" "https://example.com/ai-agents" "https://example.com/llm-agents"
```

The agent will:
1. Research each provided URL
2. Synthesize the information
3. Generate a blog post
4. Save it as a markdown file in the `blogs` directory

## Output

The generated blog posts will be saved in the `blogs` directory with:
- Clean, URL-friendly filenames
- YAML frontmatter with metadata
- Well-structured markdown content
- Proper headings and sections

Example output structure:
```markdown
---
title: Understanding AI Agents
date: 2024-01-30
---

# Understanding AI Agents

[Generated content here...]
```

## Project Structure

```
researcher-agent/
├── src/
│   ├── agents/
│   │   ├── researcher.ts    # Researcher agent
│   │   ├── blog-writer.ts   # Blog writer agent
│   │   └── orchestrator.ts  # Orchestrator agent
│   ├── tools/
│   │   ├── web-scraper.ts   # Web scraping tool
│   │   └── blog-writer.ts   # Blog writing tool
│   └── index.ts            # Main entry point
├── blogs/                  # Generated blog posts
└── package.json
```

## Dependencies

- `@agenite/agent`: Core agent framework
- `@agenite/tool`: Tool creation utilities
- `cheerio`: Web scraping
- `axios`: HTTP requests
- `typescript`: Type support

## Development

To run in development mode with auto-reload:
```bash
npm run dev "Your Topic" "https://source1.com"
```

## Error Handling

The system handles various error cases:
- Invalid URLs
- Failed scraping attempts
- Network issues
- File system errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 
