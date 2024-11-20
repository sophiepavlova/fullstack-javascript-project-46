import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);

  return keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, { key, type: 'removed', value: value1 }];
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, { key, type: 'added', value: value2 }];
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return [...acc, { key, type: 'nested', children: buildDiff(value1, value2) }];
    }

    if (value1 !== value2) {
      return [
        ...acc,
        {
          key,
          type: 'changed',
          value1,
          value2,
        },
      ];
    }

    return [...acc, { key, type: 'unchanged', value: value1 }];
  }, []);
};

export default buildDiff;
