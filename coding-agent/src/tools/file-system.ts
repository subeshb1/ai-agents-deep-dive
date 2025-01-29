import { Tool, ToolExecuteParams } from '@agenite/tool';
import * as fs from 'fs/promises';
import * as path from 'path';

interface FileParams {
  filePath: string;
}

interface WriteFileParams extends FileParams {
  content: string;
}

interface DirParams {
  dirPath: string;
}

export const readFileTool = new Tool<FileParams>({
  name: 'readFile',
  description: 'Read the contents of a file',
  inputSchema: {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'Path to the file to read',
      },
    },
    required: ['filePath'],
  },
  execute: async ({ input }) => {
    const filePath = input.filePath;
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return { success: true, data: content };
    } catch (error) {
      return { success: false, data: (error as Error).message };
    }
  },
});

export const writeFileTool = new Tool<WriteFileParams>({
  name: 'writeFile',
  description: 'Write content to a file',
  inputSchema: {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'Path to the file to write',
      },
      content: {
        type: 'string',
        description: 'Content to write to the file',
      },
    },
    required: ['filePath', 'content'],
  },
  execute: async ({ input }) => {
    const filePath = input.filePath;
    const content = input.content;
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      return { success: true, data: 'File written successfully' };
    } catch (error) {
      return { success: false, data: (error as Error).message };
    }
  },
});

export const listDirectoryTool = new Tool<DirParams>({
  name: 'listDirectory',
  description: 'List contents of a directory',
  inputSchema: {
    type: 'object',
    properties: {
      dirPath: {
        type: 'string',
        description: 'Path to the directory to list',
      },
    },
    required: ['dirPath'],
  },
  execute: async ({ input }) => {
    const dirPath = input.dirPath;
    try {
      const items = await fs.readdir(dirPath);
      const itemsWithStats = await Promise.all(
        items.map(async (item) => {
          const fullPath = path.join(dirPath, item);
          const stats = await fs.stat(fullPath);
          return {
            name: item,
            isDirectory: stats.isDirectory(),
            size: stats.size,
          };
        })
      );
      return { 
        success: true, 
        data: JSON.stringify(itemsWithStats, null, 2)
      };
    } catch (error) {
      return { success: false, data: (error as Error).message };
    }
  },
});
