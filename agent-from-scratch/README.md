# Building an AI Agent from Scratch

This project provides a step-by-step guide to building an AI agent, starting from basic LLM interactions to creating a self-reflective agent capable of using tools. Each example builds upon the previous one, introducing new concepts and capabilities.

## Prerequisites

- Node.js 18+
- An LLM provider (Ollama or Bedrock)
  - Default: Ollama with llama3.2 model
  - Can be configured via environment variables:
    - `LLM_PROVIDER`: 'ollama' or 'bedrock'
    - `LLM_MODEL_ID`: Model name/ID for the chosen provider

## Examples

### 1. Basic LLM Call (`src/1-basic-llm-call`)
Demonstrates the most basic interaction with an LLM:
- Simple prompt/response
- Understanding response structure
- Token usage tracking

```bash
npm run basic
```

### 2. Adding Context (`src/2-adding-context`)
Shows how to provide system context to guide the LLM's behavior:
- Setting system prompts
- Message history
- Role-based interactions

```bash
npm run context
```

### 3. Invoking Tools (`src/3-invoking-tools`)
Introduces tool usage capabilities:
- Defining tools with schemas
- Tool invocation by the LLM
- Handling tool results

```bash
npm run tools
```

### 4. Self-Feedback Agent (`src/4-self-feedback`)
Builds a complete agent with:
- Continuous conversation
- Multiple tool usage
- Self-reflection capabilities
- Dynamic response handling

```bash
npm run agent
```

## Project Structure

```
src/
├── 1-basic-llm-call/     # Basic LLM interaction
├── 2-adding-context/     # System prompts and context
├── 3-invoking-tools/     # Tool definition and usage
└── 4-self-feedback/      # Complete agent implementation
```

## Running Examples Directly

You can also run any example directly using tsx:

```bash
npx tsx src/1-basic-llm-call
npx tsx src/2-adding-context
npx tsx src/3-invoking-tools
npx tsx src/4-self-feedback
```

## Output Format

The examples use a consistent, colorized output format:
- 👤 User messages
- 🤖 Assistant responses
- 🔧 Tool usage
- 📊 Tool results
- ⚙️ System messages

## Environment Variables

```bash
# LLM Provider Configuration
export LLM_PROVIDER=ollama     # or 'bedrock'
export LLM_MODEL_ID=llama3.2   # or any other supported model
```

## Dependencies

- `@agenite/llm`: Core LLM types and interfaces
- `shared-llm-provider`: Shared LLM provider implementation and utilities
- `tsx`: TypeScript execution environment (dev dependency) 
