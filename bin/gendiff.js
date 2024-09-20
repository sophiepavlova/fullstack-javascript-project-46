#!/usr/bin/env node

import { Command } from 'commander';
import { fileParse } from './src/fileParser.js';
import { cwd } from 'node:process';
import _ from 'lodash';


// console.log(`Current directory: ${cwd()}`);
const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const file1Parsed = fileParse(filePath1);
    const file2Parsed = fileParse(filePath2);
    // console.log(`first file parsed: ${JSON.stringify(file1Parsed, null, 2)}`);
    // console.log(`second file parsed: ${JSON.stringify(file2Parsed, null, 2)}`);

    // Step 4
    //Creating arrays out of files
    // console.log(file1Parsed);
    // const difference = {};
    let difference = `{\n`
   const keys1 = Object.keys(file1Parsed);
   const keys2 = Object.keys(file2Parsed);
//    const keys = [ ... new Set([... keys1, ... keys2])]; //[ 'host', 'timeout', 'proxy', 'follow', 'verbose' ]
   const keys = _.sortBy([ ... new Set([... keys1, ... keys2])]); //[ 'host', 'timeout', 'proxy', 'follow', 'verbose' ]
//    console.log(keys);
   keys.forEach((key) => {
    if(_.has(file1Parsed, key) && !_.has(file2Parsed, key)) {
        // difference[`- ${key}`] = file1Parsed[key];
        difference += `  - ${key}: ${file1Parsed[key]}\n`;
    } else if (!_.has(file1Parsed, key) && _.has(file2Parsed, key)) {
        // difference[`+ ${key}`] = file2Parsed[key];
        difference += `  + ${key}: ${file2Parsed[key]}\n`;
    } else if (file1Parsed[key] !== file2Parsed[key]) {
        // difference[`- ${key}`] = file1Parsed[key];
        // difference[`+ ${key}`] = file2Parsed[key];
        difference += `  - ${key}: ${file1Parsed[key]}\n`;
        difference += `  + ${key}: ${file2Parsed[key]}\n`;
    } else {
        // difference[`  ${key}`] = file1Parsed[key]; 
        difference += `    ${key}: ${file1Parsed[key]}\n`;
    }
   });
   //    const diff = JSON.stringify(difference, null, 2)
   difference += `}`
   console.log(difference);
//    console.log(diff);
  })
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

