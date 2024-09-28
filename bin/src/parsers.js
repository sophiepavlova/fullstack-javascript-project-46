import * as fs from 'node:fs';
import * as path  from 'node:path';
import yaml from 'js-yaml';

export const fileParse = (filePath) => {
    // console.log(`Parsing file: ${filePath}`);
    const absolutePath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    const extention = path.extname(filePath);
    let fileParsed;

    try {
        if (extention === '.json') {
            fileParsed = JSON.parse(fileContent);
        } else if (extention === '.yml' || extention === '.yaml') {
            fileParsed = yaml.load(fileContent);
        } else {
            throw new Error(`Unsupported file type: ${extention}`);
        }
    } catch (error) {
        console.error(`Error parsing file ${filePath}: ${error.message}`);
        throw error; // Rethrow the error after logging it
    }

    return fileParsed;
};
