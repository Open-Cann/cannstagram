module.exports = {
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
  