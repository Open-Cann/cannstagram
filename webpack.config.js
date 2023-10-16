const nodeExternals = require('webpack-node-externals');

module.exports = {
  externals: [nodeExternals()],
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
        fs: false,
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        net: false,
      },
    },
  };
  