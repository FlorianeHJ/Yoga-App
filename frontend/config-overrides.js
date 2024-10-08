module.exports = {
    webpack: function (config, env) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            buffer: require.resolve('buffer/'),
        }
        return config
    },
}
