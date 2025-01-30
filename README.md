# Deep Dive into Building AI Agents with LLMs

This repository is the official companion code for the blog series "Deep Dive into Building AI Agents with LLMs". It provides a hands-on, practical approach to understanding and building AI agents, from basic implementations to complex, specialized systems.

## 📚 About the Blog Series

This repository contains all the code examples and projects discussed in the blog series. Each project represents a different aspect of AI agent development, allowing readers to:
- Follow along with practical examples
- Experiment with different agent architectures
- Build their own AI agents from scratch
- Understand real-world agent implementations

## 🎓 Learning Path

The repository is structured to follow the blog series progression:

### 1. Agent from Scratch
Start here to understand the fundamentals:
- Basic LLM interactions
- Context and system prompts
- Tool invocation
- Self-feedback mechanisms

### 2. Coding Agent
Progress to a practical implementation:
- Code analysis and generation
- File system operations
- Interactive assistance
- Development workflow integration

### 3. Researcher Agent
Explore advanced agent capabilities:
- Multi-source research capabilities
- Agent collaboration architecture
- Automated blog writing
- Content synthesis from multiple sources

## 🏗️ Repository Structure

```
ai-agents-deep-dive/
├── agent-from-scratch/  # Start here - Basic concepts and fundamentals
├── coding-agent/        # Intermediate - Practical coding assistant
├── researcher-agent/    # Advanced - Complex multi-agent system
├── shared-llm-provider/ # Shared LLM infrastructure
└── packages/           # Shared utilities and configurations
```

## 🛠️ Key Concepts Covered

- **LLM Integration**: Working with modern language models
- **Tool-based Architecture**: Building modular, extensible agents
- **TypeScript**: Using strong typing for robust agent development
- **Error Handling**: Implementing robust error management
- **Clean Output**: Creating user-friendly interfaces

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-agents-deep-dive
```

2. Install dependencies:
```bash
npm install
```

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- AWS Account (for Bedrock)
- Git
- (Optional) Ollama for local development

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-agents-deep-dive
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ LLM Provider Setup

This project uses Amazon Bedrock by default, with Ollama as an alternative for local development.

### Amazon Bedrock (Default)

1. **AWS Account Setup**:
   - Ensure you have an AWS account with Bedrock access
   - Request access to the Claude models in the Bedrock console
   - Set up AWS credentials locally

2. **Configure AWS Credentials**:
   ```bash
   # Option 1: Using AWS CLI
   aws configure
   
   # Option 2: Environment variables
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   export AWS_REGION="your-region"  # e.g., us-east-1 where you have access to Bedrock models
   ```

3. **Set Bedrock Environment Variables**:
   ```bash
   export LLM_PROVIDER=bedrock
   export LLM_MODEL_ID=anthropic.claude-v2  # or anthropic.claude-3-sonnet-20240229-v1:0 or any bedrock model
   ```

### Ollama (Local Development)

1. **Install Ollama**:
   Go to https://ollama.com/ and install the latest version

2. **Pull Required Model**:
   ```bash
   ollama pull llama2
   ```

3. **Set Ollama Environment Variables**:
   ```bash
   export LLM_PROVIDER=ollama
   export LLM_MODEL_ID=llama2    # or any other supported model
   ```

4. **Start Ollama Server**:
   ```bash
   ollama serve
   ```

   **Note**: Some examples might not work with Ollama, but you can still use them as a reference.

### Verifying Setup

Test your LLM provider setup:
```bash
# Navigate to agent-from-scratch
cd agent-from-scratch

# Run the basic example
npm run basic
```

If everything is set up correctly, you should see a response from the LLM.

## 🎯 What You'll Build

1. **Foundation (Agent from Scratch)**
   - Understanding LLM interactions
   - Building basic agent architecture
   - Implementing tool usage
   - Creating self-improving agents

2. **Practical Application (Coding Agent)**
   - Code analysis and generation
   - Development assistance
   - File system operations
   - Real-world agent usage

3. **Advanced Implementation (Researcher Agent)**
   - Multi-agent systems
   - Content research and synthesis
   - Automated content creation
   - Complex workflow orchestration

## 🤝 Contributing

Found a bug or want to improve the examples? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License

## 🙏 Acknowledgments

- Built with modern AI techniques and best practices
- Inspired by real-world agent implementations
- Uses the [@agenite](https://github.com/subeshb1/agenite) framework for agent development

---
*Note: This repository is actively maintained alongside the blog series. Check back for updates and new examples as new blog posts are published.*
