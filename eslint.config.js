import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import'; // Import the plugin
import globals from 'globals';

export default {
    ...pluginJs.configs.recommended,
    plugins: { import: importPlugin },
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
        },
    },
    ignores: ['coverage/**', 'node_modules/**'],
    rules: {
        'import/named': 'off',
        'import/prefer-default-export': 'off',
        'import/order': ['error', {
            'alphabetize': { order: 'asc', caseInsensitive: true },
            'newlines-between': 'always',
        }],
        // 'import/prefer-default-export': 'error',
        'indent': ['error', 4],
        'object-curly-newline': ['error', { multiline: true }],
        'no-trailing-spaces': 'error',
        'spaced-comment': ['error', 'always'],
        'no-multi-spaces': 'error',
        'semi': ['error', 'always'],
        'comma-spacing': ['error', { before: false, after: true }],
        'eol-last': ['error', 'always'],
        'padded-blocks': ['error', 'never'],
        'quotes': ['error', 'single'],
        'no-multiple-empty-lines': ['error', { max: 1 }],
    },
};
