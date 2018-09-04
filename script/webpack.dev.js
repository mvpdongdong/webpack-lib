var webpack = require('webpack'),
  pkg = require('../package.json');
exports = require('./webpack.base');

exports.output.filename = `${pkg.name}.js`;
exports.devtool = 'source-map';

exports.plugins = exports.plugins.concat([
  new webpack.NamedModulesPlugin()
]);

module.exports = exports;
