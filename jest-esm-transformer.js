const { transform } = require('esbuild');

module.exports = {
    process(source) {
        return transform(source, {
            loader: 'js',
            target: 'node14', // or your current Node version
        }).then((result) => result.code);
    },
};
