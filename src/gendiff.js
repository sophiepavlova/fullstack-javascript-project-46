import * as fs from 'node:fs';
import * as path from 'node:path';

import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';
import fileParse from './parsers.js';

export function resolveFilePath(filename) {
  return path.isAbsolute(filename) ? filename : path.resolve(process.cwd(), '__fixtures__', filename);
};

function getFileData(filePath) {
  const absolutePath = resolveFilePath(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extention = path.extname(filePath);
  return { fileContent, extention };
};

export const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const { fileContent: content1, extention: extention1 } = getFileData(filePath1);
  const { fileContent: content2, extention: extention2 } = getFileData(filePath2);

  const file1Parsed = fileParse(content1, extention1);
  const file2Parsed = fileParse(content2, extention2);

  const diff = buildDiff(file1Parsed, file2Parsed);
  const format = getFormatter(formatName);

  return format(diff);
};

export default gendiff;
