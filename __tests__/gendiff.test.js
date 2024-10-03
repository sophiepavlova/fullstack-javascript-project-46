import { gendiff } from '../bin/gendiff.js';
import path from 'node:path';
import { stylish } from '../src/formatters.js';

const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');

const fileYmlpath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
const fileYmlpath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');

const expectedDifference = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const compareFiles = (path1, path2, expectedDiff) => {
    const result = gendiff(path1, path2);
    const formattedResult = stylish(result);
    expect(formattedResult).toEqual(expectedDiff);
}
describe('gendiff', () => {
    test('difference between file2 and file1', () =>  compareFiles(filepath1, filepath2, expectedDifference));
    test('difference between file2 and file1 in yml format', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifference));
});