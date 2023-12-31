const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [nodeExternals({
    allowlist: ['node:buffer', 'node:fs', 'node:https', 'node:http', 'node:net', 'node:path', 'node:process', 'node:stream/web', 'node:stream', 'node:url', 'node:util', 'node:zlib'],
  }),
],
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      console: require.resolve("console-browserify"),
      constants: require.resolve("constants-browserify"),
      crypto: require.resolve("crypto-browserify"),
      domain: require.resolve("domain-browser"),
      events: require.resolve("events/"),
      fs: false,
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-browserify'),
      net: false,
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      punycode: require.resolve("punycode/"),
      process: require.resolve("process/browser"),
      querystring: require.resolve("querystring-es3/"),
      stream: require.resolve("stream-browserify"),
      _stream_duplex: require.resolve("readable-stream/duplex"),
      _stream_passthrough: require.resolve("readable-stream/passthrough"),
      _stream_readable: require.resolve("readable-stream/readable"),
      _stream_transform: require.resolve("readable-stream/transform"),
      _stream_writable: require.resolve("readable-stream/writable"),
      string_decoder: require.resolve("string_decoder/"),
      timers: require.resolve("timers-browserify"),
      tty: require.resolve("tty-browserify"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      vm: require.resolve("vm-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          esModuleInterop: true, // Ensure this option is set to true
        },
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
};
