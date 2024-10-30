import _ from 'lodash';

const stylish = (diff) => {
  const baseIndentSize = 4; // Indentation for normal (unchanged) top-level keys
  const markerIndentSize = 2; // Indentation before markers ('+' or '-')

  const makeIndent = (depth, isMarker = false) => {
    const indentLevel = depth * baseIndentSize;
    return isMarker ? ' '.repeat(indentLevel - markerIndentSize) : ' '.repeat(indentLevel);
  };

  const stringify = (value, depth) => {
    if (!_.isObject(value) || value === null) {
      return String(value);
    }
    const lines = Object.entries(value).map(([key, val]) => {
      return `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`;
    });
    return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`;
  };

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
