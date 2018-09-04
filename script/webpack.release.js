const webpack = require('webpack');
const pkg = require('../package.json');
exports = require('./webpack.base');

exports.output.filename = `${pkg.name}.min.js`;
exports.devtool = false;
exports.plugins = exports.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      properties: false,
      warnings: false,
      drop_console: true,
      screw_ie8: false
    },
    output: {
      quote_keys: true,
      screw_ie8: false
    },
    mangle: {
      screw_ie8: false
    },
    sourceMap: false
  })
]);

module.exports = exports;
