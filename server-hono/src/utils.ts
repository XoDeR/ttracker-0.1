import { readFileSync, writeFileSync, existsSync } from 'fs';

export const readData = <T>(filePath: string): T[] => {
  if (!existsSync(filePath)) return [];
  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const writeData = <T>(filePath: string, data: T[]): void => {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};