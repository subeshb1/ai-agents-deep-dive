import { Tool, ToolExecuteParams } from '@agenite/tool';
import * as fs from 'fs/promises';
import * as path from 'path';

interface FileParams {
  filePath: string;
}

export const findFunctionsTool = new Tool<FileParams>({
  name: 'findFunctions',
  description: 'Find all function declarations in a file',
  inputSchema: {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'Path to the file to analyze',
      },
    },
    required: ['filePath'],
  },
  execute: async (params: ToolExecuteParams<FileParams>) => {
    const filePath = params.input.filePath;
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      // Simple regex to find function declarations
      // In a real implementation, you'd want to use a proper parser
      const functionRegex = /function\s+(\w+)\s*\([^)]*\)/g;
      const matches = [...content.matchAll(functionRegex)];

      const functions = matches.map((match) => ({
        name: match[1],
        declaration: match[0],
      }));

      return {
        success: true,
        data: JSON.stringify(functions, null, 2)
      };
    } catch (error) {
      return {
        success: false,
        data: (error as Error).message
      };
    }
  },
});

export const findImportsTool = new Tool<FileParams>({
  name: 'findImports',
  description: 'Find all import statements in a file',
  inputSchema: {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'Path to the file to analyze',
      },
    },
    required: ['filePath'],
  },
  execute: async (params: ToolExecuteParams<FileParams>) => {
    const filePath = params.input.filePath;
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      // Simple regex to find import statements
      const importRegex =
        /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"]/g;
      const matches = [...content.matchAll(importRegex)];

      return {
        success: true,
        data: JSON.stringify(matches.map((match) => match[0]), null, 2)
      };
    } catch (error) {
      return {
        success: false,
        data: (error as Error).message
      };
    }
  },
});
