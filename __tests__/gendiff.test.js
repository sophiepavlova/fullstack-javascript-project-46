import { gendiff } from '../bin/gendiff.js';
import path from 'node:path';

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

const expectedDifferencePlain = `
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

const compareFiles = (path1, path2, expectedDiff, format) => {
    const result = gendiff(path1, path2,format);
  
    expect(result.trim()).toEqual(expectedDiff.trim());
}
describe('gendiff', () => {
    test('difference between file2 and file1 in json, format stylish', () =>  compareFiles(filepath1, filepath2, expectedDifference, 'stylish'));
    test('difference between file2 and file1 in json, format plain', () =>  compareFiles(filepath1, filepath2, expectedDifferencePlain, 'plain'));
    test('difference between file2 and file1 in yml, format stylish', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifference, 'stylish'));
    test('difference between file2 and file1 in yml, format plain', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifferencePlain, 'plain'));
});