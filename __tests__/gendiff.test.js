import fs from 'node:fs';
import path from 'node:path';

import { gendiff } from '../src/gendiff.js';

const filePathAssemble = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const expectedDifference = fs.readFileSync(
  path.resolve(__dirname, '..', '__fixtures__', 'expectedDifference.txt'),
  'utf-8'
);

const expectedDifferencePlain = fs.readFileSync(
  path.resolve(__dirname, '..', '__fixtures__', 'expectedDifferencePlain.txt'),
  'utf-8'
);

const expectedDifferenceJson = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', '__fixtures__', 'expectedDifferenceJson.json'),
    'utf-8'
  )
);

const compareFiles = (path1, path2, expectedDiff, format) => {
  const result = gendiff(path1, path2, format);
  if (format === 'json') {
    expect(JSON.parse(result)).toEqual(expectedDiff);
  } else {
    expect(result.trim()).toEqual(expectedDiff.trim());
  }
};
describe('gendiff', () => {
  test('difference between file2 and file1 in json, format stylish', () => compareFiles(filePathAssemble('file1.json'), filePathAssemble('file2.json'), expectedDifference, 'stylish'));
  test('difference between file2 and file1 in json, format plain', () => compareFiles(filePathAssemble('file1.json'), filePathAssemble('file2.json'), expectedDifferencePlain, 'plain'));
  test('difference between file2 and file1 in yml, format stylish', () => compareFiles(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), expectedDifference, 'stylish'));
  test('difference between file2 and file1 in yml, format plain', () => compareFiles(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), expectedDifferencePlain, 'plain'));
  test('difference between file2 and file1 in json, format JSON', () => compareFiles(filePathAssemble('file1.json'), filePathAssemble('file2.json'), expectedDifferenceJson, 'json'));
  test('difference between file2 and file1 in yml, format JSON', () => compareFiles(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), expectedDifferenceJson, 'json'));
});
