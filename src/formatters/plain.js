import { formatValue} from '../utils.js';

const plain = (diff) => {
    const iter = (node, parentPath) => {
        const lines = node.map(({ key, type, value, value1, value2, children }) => {
            const currentPath = parentPath ? `${parentPath}.${key}` : key;
            switch (type) {
              case 'added':
                  return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
              case 'removed':
                  return `Property '${currentPath}' was removed`;
              case 'changed':
                  return `Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
                  // case 'unchanged':
                  //     return ``;
              case 'nested':
                  return iter(children, currentPath);
              default:
                  return '';
            }
        });

        return lines.filter(line => line).join('\n');
    };

    return iter(diff, '');
};

export default plain;
