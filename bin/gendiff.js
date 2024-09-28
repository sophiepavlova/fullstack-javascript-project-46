#!/usr/bin/env node

import { fileParse } from './src/parsers.js';
import _ from 'lodash';

export const  gendiff = (filePath1, filePath2) => {
    // console.log('gendiff function called');
  const file1Parsed = fileParse(filePath1);
  const file2Parsed = fileParse(filePath2);
//   console.log('File1 parsed:', file1Parsed);
//   console.log('File2 parsed:', file2Parsed);

  // Step 4
 let difference = `{\n`;
 const keys1 = Object.keys(file1Parsed);
 const keys2 = Object.keys(file2Parsed);
 const keys = _.sortBy([ ... new Set([... keys1, ... keys2])]); //[ 'host', 'timeout', 'proxy', 'follow', 'verbose' ]
//    console.log(keys);
 keys.forEach((key) => {
  if (_.has(file1Parsed, key) && !_.has(file2Parsed, key)) {
      difference += `  - ${key}: ${file1Parsed[key]}\n`;
  } else if (!_.has(file1Parsed, key) && _.has(file2Parsed, key)) {
      difference += `  + ${key}: ${file2Parsed[key]}\n`;
  } else if (file1Parsed[key] !== file2Parsed[key]) {
      difference += `  - ${key}: ${file1Parsed[key]}\n`;
      difference += `  + ${key}: ${file2Parsed[key]}\n`;
  } else {
      difference += `    ${key}: ${file1Parsed[key]}\n`;
  }
});
difference += `}`;
// console.log(difference);
 return difference;
};

