import path from 'node:path';

import fileParse from '../src/parsers.js';

const testJsonParsing = () => {
  const jsonFilePath1 = path.resolve(process.cwd(), '__fixtures__', 'file1.json');
  const jsonFilePath2 = path.resolve(process.cwd(), '__fixtures__', 'file2.json');

  try {
    const data1 = fileParse(jsonFilePath1);
    const data2 = fileParse(jsonFilePath2);
    console.log('Parsed file1.json:', data1);
    console.log('Parsed file2.json:', data2);
  } catch (error) {
    console.error('Failed to parse JSON files:', error.message);
  }
};
testJsonParsing();
