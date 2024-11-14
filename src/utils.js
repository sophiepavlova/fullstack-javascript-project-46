import _ from 'lodash';

const baseIndentSize = 4;
const markerIndentSize = 2;

export const formatValue = (value) => {
    if (_.isObject(value)&& !Array.isArray(value)) {
        return '[complex value]';
    }
    if (typeof value === 'boolean') {
        return value.toString();
    };
    if (value === null) return 'null';
    if (typeof value === 'string') return `'${value}'`;
    return String(value);
};

export const makeIndent = (depth, isMarker = false) => {
    const indentLevel = depth * baseIndentSize;
    return isMarker ? ' '.repeat(indentLevel - markerIndentSize) : ' '.repeat(indentLevel);
};

export const stringify = (value, depth) => {
    if (!_.isObject(value) || value === null) {
        return String(value);
    }
    const lines = Object.entries(value).map(([key, val]) => {
        return `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`;
    });
    return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`;
};
