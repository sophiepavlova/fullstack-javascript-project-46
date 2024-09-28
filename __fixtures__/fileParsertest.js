import { fileParse } from '../bin/src/fileParser.js';
import path from 'node:path';

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

// Call the function to test parsing
testJsonParsing();
