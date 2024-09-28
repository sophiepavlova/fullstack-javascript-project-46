#!/usr/bin/env node

import { Command } from 'commander';
import { gendiff } from './gendiff.js';
import * as path from 'node:path';

const program = new Command();
const fixturesDir = path.resolve(process.cwd(), '__fixtures__');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filename1> <filename2>')
  .action((filename1, filename2) => {
    // Construct full paths
    const filePath1 = path.join(fixturesDir, filename1);
    const filePath2 = path.join(fixturesDir, filename2);

    // console.log(`File1: ${filePath1}`);
    // console.log(`File2: ${filePath2}`);

    const result = gendiff(filePath1, filePath2);
    console.log( result);
  })
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
