import { gendiff } from '../bin/gendiff.js';
import path from 'node:path';

const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');

const fileYmlpath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
const fileYmlpath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');

const expectedDifference = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const compareFiles = (path1, path2) => {
    const result = gendiff(path1, path2);
    console.log('Expected Difference:', expectedDifference);
    console.log('Actual Result:', result);
    expect(result).toEqual(expectedDifference);
}
describe('gendiff', () => {
    test('difference between file2 and file1', () =>  compareFiles(filepath1, filepath2));
    // Difference between 2 yml files
    test('difference between file2 and file1 in yml format', () =>  compareFiles(fileYmlpath1, fileYmlpath2));
});