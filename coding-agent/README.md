# AI Coding Agent

An intelligent coding assistant built with @agenite framework that can help with various coding tasks.

## Features

- File system operations (read, write, list directories)
- Code analysis (find functions, imports)
- Interactive assistance with coding tasks
- Beautiful console output with icons and colors

## Project Structure

```
src/
├── agent.ts           # Main agent implementation
├── index.ts          # Entry point
└── tools/            # Tool implementations
    ├── file-system.ts    # File system operations
    └── code-analysis.ts  # Code analysis utilities
```

## Tools

### File System Tools
- `readFile`: Read contents of a file
- `writeFile`: Write content to a file
- `listDirectory`: List contents of a directory

### Code Analysis Tools
- `findFunctions`: Find function declarations in a file
- `findImports`: Find import statements in a file

## Dependencies

- `@agenite/agent`: Core agent framework
- `@agenite/tool`: Tool creation utilities
- `shared-llm-provider`: Shared LLM provider implementation

## Running the Agent

```bash
# Install dependencies
npm install

# Start the agent
npm start

# Development mode with auto-reload
npm run dev
```

## Environment Variables

The agent uses the same LLM configuration as shared-llm-provider:

```bash
export LLM_PROVIDER=ollama     # or 'bedrock'
export LLM_MODEL_ID=llama3.2   # or any other supported model
```

## Example Usage

```typescript
const agent = new CodingAgent();

// Analyze a file
await agent.start('Can you analyze the code in src/agent.ts?');

// Find functions
await agent.start('What functions are defined in src/tools/file-system.ts?');

// Make code modifications
await agent.start('Can you add error handling to the readFile function?');
``` 
