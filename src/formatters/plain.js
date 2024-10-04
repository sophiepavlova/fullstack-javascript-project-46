import _ from 'lodash';

 const plain = (diff) => {
    const formatValue = (value) => {
        if (_.isObject(value)&& !Array.isArray(value)) {
            return '[complex value]';
        }
        if (typeof value === 'boolean') {
            return value.toString();
        };
        if (value === null) return `null`;
        if (typeof value === 'string') return `'${value}'`;
        return String(value)
    }
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

    // Start from depth 1 to ensure proper indentation for top-level elements
    return iter(diff, '');
 };

 export default plain;