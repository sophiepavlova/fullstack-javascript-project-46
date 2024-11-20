const { transform } = require('esbuild');

const processSource = (source) => {
  return transform(source, {
    loader: 'js',
    target: 'node14',
  }).then((result) => result.code);
};

module.exports = { process: processSource };
