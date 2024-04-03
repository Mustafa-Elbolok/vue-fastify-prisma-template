/** @format */

module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true, jest: true },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: [
        '.eslintrc.cjs',
        'LICENSE',
        'README.md',
        '**/.eslintrc.cjs',
        '**/LICENSE',
        '**/README.md',
        '**/*.pem',
        '**/dist',
        '**/build',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
