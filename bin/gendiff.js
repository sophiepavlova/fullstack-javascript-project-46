
import { fileParse } from './src/fileParser.js';
import _ from 'lodash';

export const  gendiff = ((filePath1, filePath2) => {
  const file1Parsed = fileParse(filePath1);
  const file2Parsed = fileParse(filePath2);

  // Step 4
 let difference = `{\n`;
 const keys1 = Object.keys(file1Parsed);
 const keys2 = Object.keys(file2Parsed);
 const keys = _.sortBy([ ... new Set([... keys1, ... keys2])]); //[ 'host', 'timeout', 'proxy', 'follow', 'verbose' ]
//    console.log(keys);
 keys.forEach((key) => {
  if(_.has(file1Parsed, key) && !_.has(file2Parsed, key)) {
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
 return difference;
});

