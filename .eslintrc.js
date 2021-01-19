module.exports = {
    root: true,
    extends: [
        '@antriver/eslint-config-antriver/vue-typescript',
    ],
    plugins: [
        'jsdoc',
    ],
    env: {
        node: true,
        jest: true,
    },
    settings: {
        // Use aliases from Webpack config.
        'import/resolver': {
            // "node" is here to fix a problem with built-in packages being marked as unresolved
            // https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-511007063
            node: {
                extensions: ['.js', '.ts'],
            },
            webpack: {
                config: './webpack.config.js',
            },
        },
    },
};
