import yaml from 'js-yaml';

export const fileParse = (fileContent, extention) => {

    switch (extention) {
        case '.json':
            return JSON.parse(fileContent);
        case '.yml':
            return  yaml.load(fileContent);
        case '.yaml':
            return  yaml.load(fileContent);
        default:
            console.log(extention);
            throw new Error(`Unsupported extension - ${extention}`)
    }
};
