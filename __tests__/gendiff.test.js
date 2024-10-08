import gendiff from '../bin/gendiff.js';
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
Property 'group3' was added with value: [complex value]`;

const expectedDifferenceJson = [
  {
    key: "common",
    type: "nested",
    children: [
      { key: "follow", type: "added", value: false },
      { key: "setting1", type: "unchanged", value: "Value 1" },
      { key: "setting2", type: "removed", value: 200 },
      { key: "setting3", type: "changed", value1: true, value2: null },
      { key: "setting4", type: "added", value: "blah blah" },
      { key: "setting5", type: "added", value: { key5: "value5" } },
      {
        key: "setting6",
        type: "nested",
        children: [
          {
            key: "doge",
            type: "nested",
            children: [
              { key: "wow", type: "changed", value1: "", value2: "so much" },
            ],
          },
          { key: "key", type: "unchanged", value: "value" },
          { key: "ops", type: "added", value: "vops" },
        ],
      },
    ],
  },
  {
    key: "group1",
    type: "nested",
    children: [
      { key: "baz", type: "changed", value1: "bas", value2: "bars" },
      { key: "foo", type: "unchanged", value: "bar" },
      { key: "nest", type: "changed", value1: { key: "value" }, value2: "str" },
    ],
  },
  {
    key: "group2",
    type: "removed",
    value: { abc: 12345, deep: { id: 45 } },
  },
  {
    key: "group3",
    type: "added",
    value: { deep: { id: { number: 45 } }, fee: 100500 },
  },
];

const compareFiles = (path1, path2, expectedDiff, format) => {
  const result = gendiff(path1, path2,format);
  if (format === 'json') {
      expect(JSON.parse(result)).toEqual(expectedDiff);
  } else {
    expect(result.trim()).toEqual(expectedDiff.trim());
  }
  
}
describe('gendiff', () => {
    test('difference between file2 and file1 in json, format stylish', () =>  compareFiles(filepath1, filepath2, expectedDifference, 'stylish'));
    test('difference between file2 and file1 in json, format plain', () =>  compareFiles(filepath1, filepath2, expectedDifferencePlain, 'plain'));
    test('difference between file2 and file1 in yml, format stylish', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifference, 'stylish'));
    test('difference between file2 and file1 in yml, format plain', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifferencePlain, 'plain'));
    test('difference between file2 and file1 in json, format JSON', () =>  compareFiles(filepath1, filepath2, expectedDifferenceJson, 'json'));
    test('difference between file2 and file1 in yml, format JSON', () =>  compareFiles(fileYmlpath1, fileYmlpath2, expectedDifferenceJson, 'json'));
});