import fs from 'node:fs';
import path from 'node:path';

import gendiff from '../src/gendiff.js';

const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');

const fileYmlpath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
const fileYmlpath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');

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
  test('difference between file2 and file1 in json, format stylish', () => compareFiles(filepath1, filepath2, expectedDifference, 'stylish'));
  test('difference between file2 and file1 in json, format plain', () => compareFiles(filepath1, filepath2, expectedDifferencePlain, 'plain'));
  test('difference between file2 and file1 in yml, format stylish', () => compareFiles(fileYmlpath1, fileYmlpath2, expectedDifference, 'stylish'));
  test('difference between file2 and file1 in yml, format plain', () => compareFiles(fileYmlpath1, fileYmlpath2, expectedDifferencePlain, 'plain'));
  test('difference between file2 and file1 in json, format JSON', () => compareFiles(filepath1, filepath2, expectedDifferenceJson, 'json'));
  test('difference between file2 and file1 in yml, format JSON', () => compareFiles(fileYmlpath1, fileYmlpath2, expectedDifferenceJson, 'json'));
});
