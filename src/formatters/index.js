import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
    stylish,
    plain,
    json,
};

const getFormatter = (format) => {
    const formatter = formatters[format];
    if (!formatter) {
        throw new Error (`Unknown format ${format}`);
    }
    return formatter;
};
export default getFormatter;
