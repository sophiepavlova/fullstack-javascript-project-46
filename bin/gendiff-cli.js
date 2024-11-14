#!/usr/bin/env node

import { Command } from 'commander';

import { gendiff, resolveFilePath } from '../src/gendiff.js';

const program = new Command();

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filename1> <filename2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filename1, filename2, options) => {
    // Construct full paths
        const filePath1 = resolveFilePath(filename1);
        const filePath2 = resolveFilePath(filename2);
        const result = gendiff(filePath1, filePath2, options.format);

        console.log(result);
    })
    .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
