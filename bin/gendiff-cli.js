#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/gendiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const result = gendiff(filePath1, filePath2);
    console.log(result);
  })
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);