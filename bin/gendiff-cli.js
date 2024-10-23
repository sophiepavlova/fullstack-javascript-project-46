#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';
import * as path from 'node:path';

const program = new Command();
const fixturesDir = path.resolve(process.cwd(), '__fixtures__');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filename1> <filename2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filename1, filename2, options) => {
    // Construct full paths
    const filePath1 = path.isAbsolute(filename1) ? filename1 : path.join(fixturesDir, filename1);
    const filePath2 = path.isAbsolute(filename2) ? filename2 : path.join(fixturesDir, filename2);

    const result = gendiff(filePath1, filePath2, options.format);
    
    console.log(result);
  })
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
