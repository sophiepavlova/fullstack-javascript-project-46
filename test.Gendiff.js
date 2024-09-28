// testGendiff.js
import { gendiff } from './bin/gendiff.js';

const filePath1 = './__fixtures__/file1.json';
const filePath2 = './__fixtures__/file2.json';

const runGendiff = async () => {
    const result = await gendiff(filePath1, filePath2);
    console.log(result);
};

runGendiff();
