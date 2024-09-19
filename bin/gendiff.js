#!/usr/bin/env node

import { Command } from 'commander';
import { fileParse } from './src/fileParser.js';
import { cwd } from 'node:process';


console.log(`Current directory: ${cwd()}`);
const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const file1Parsed = fileParse(filePath1);
    const file2Parsed = fileParse(filePath2);
    console.log(`first file parsed: ${JSON.stringify(file1Parsed, null, 2)}`);
    console.log(`second file parsed: ${JSON.stringify(file2Parsed, null, 2)}`);

  })
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);