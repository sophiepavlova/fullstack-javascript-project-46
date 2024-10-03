#!/usr/bin/env node

import { fileParse } from '../src/parsers.js';
import buildDiff from '../src/buildDiff.js';


export const gendiff = (filePath1, filePath2) => {
    const file1Parsed = fileParse(filePath1);
    const file2Parsed = fileParse(filePath2);

    const diff = buildDiff(file1Parsed, file2Parsed);
    return  diff;
};
