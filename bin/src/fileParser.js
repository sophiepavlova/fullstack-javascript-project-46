import * as fs from 'node:fs';
import * as path  from 'node:path';
import yaml from 'js-yaml';

export const fileParse = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    const extention = path.extname(filePath);
    let fileParsed;

    if (extention === '.json'){
        fileParsed = JSON.parse(fileContent);
    } else if(extention === '.yml' || extention === '.yaml'){
        fileParsed = yaml.load(fileContent);
    }else {
        throw new Error (`Unsupported file type: ${extention}`)
    }

    return fileParsed;
}