module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: 2,
                useBuiltIns: 'entry'
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
    ]
};
