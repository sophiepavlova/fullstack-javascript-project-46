import fs from 'node:fs';
import path from 'node:path';

import { gendiff } from '../src/gendiff.js';

const filePathAssemble = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const expectedDifference = fs.readFileSync(
  path.resolve(__dirname, '..', '__fixtures__', 'expectedDifference.txt'),
  'utf-8',
);

const expectedDifferencePlain = fs.readFileSync(
  path.resolve(__dirname, '..', '__fixtures__', 'expectedDifferencePlain.txt'),
  'utf-8',
);

const expectedDifferenceJson = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', '__fixtures__', 'expectedDifferenceJson.json'),
    'utf-8',
  ),
);

describe('gendiff', () => {
  test('difference between file2 and file1 in json, format stylish', () => {
    const result = gendiff(filePathAssemble('file1.json'), filePathAssemble('file2.json'), 'stylish');
    expect(result.trim()).toEqual(expectedDifference.trim());
  });
  test('difference between file2 and file1 in json, format plain', () => {
    const result = gendiff(filePathAssemble('file1.json'), filePathAssemble('file2.json'), 'plain');
    expect(result.trim()).toEqual(expectedDifferencePlain.trim());
  });
  test('difference between file2 and file1 in yml, format stylish', () => {
    const result = gendiff(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), 'stylish');
    expect(result.trim()).toEqual(expectedDifference.trim());
  });
  test('difference between file2 and file1 in yml, format plain', () => {
    const result = gendiff(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), 'plain');
    expect(result.trim()).toEqual(expectedDifferencePlain.trim());
  });
  test('difference between file2 and file1 in json, format json', () => {
    const result = gendiff(filePathAssemble('file1.json'), filePathAssemble('file2.json'), 'json');
    expect(JSON.parse(result)).toEqual(expectedDifferenceJson);
  });
  test('difference between file2 and file1 in yml, format json', () => {
    const result = gendiff(filePathAssemble('file1.yml'), filePathAssemble('file2.yml'), 'json');
    expect(JSON.parse(result)).toEqual(expectedDifferenceJson);
  });
});
