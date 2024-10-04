#!/usr/bin/env node

import { fileParse } from '../src/parsers.js';
import buildDiff from '../src/buildDiff.js';
import { getFormatter } from '../src/formatters/index.js';


export const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
    const file1Parsed = fileParse(filePath1);
    const file2Parsed = fileParse(filePath2);

    const diff = buildDiff(file1Parsed, file2Parsed);
    const format = getFormatter(formatName);
    
    return  format(diff);
};
