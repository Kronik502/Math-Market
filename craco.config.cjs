module.exports = {
  webpack: {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        util: require.resolve('util/'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url/'),
      },
    },
  },
};
