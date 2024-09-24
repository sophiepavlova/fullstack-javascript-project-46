import { gendiff } from '../bin/gendiff.js';
import path from 'node:path';

const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');

describe('gendiff', () => {
    test('difference between file2 and file1', () => {
    const expectedDifference = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
        const result = gendiff(filepath1, filepath2);
        expect(result).toEqual(expectedDifference);
    })
});