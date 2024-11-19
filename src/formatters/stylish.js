import _ from 'lodash';

import { makeIndent, stringify } from '../utils.js';

const stylish = (diff) => {
  const iter = (node, depth) => {
    const lines = node.map(({ key, type, value, value1, value2, children }) => {
      const normalIndent = makeIndent(depth); // Regular indent
      const markerIndent = makeIndent(depth, true); // Adjusted indent for markers ('+' or '-')

      switch (type) {
      case 'added':
        return `${markerIndent}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${markerIndent}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return `${markerIndent}- ${key}: ${stringify(value1, depth)}\n${markerIndent}+ ${key}: ${stringify(value2, depth)}`;
      case 'unchanged':
        return `${normalIndent}${key}: ${stringify(value, depth)}`;
      case 'nested':
        return `${normalIndent}${key}: {\n${iter(children, depth + 1)}\n${normalIndent}}`;
      default:
        return '';
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(diff, 1)}\n}`;
};
export default stylish;
