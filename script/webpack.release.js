const pkg = require('../package.json');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
exports = require('./webpack.base');

exports.output.filename = `${pkg.name}.min.js`;
exports.devtool = false;
exports.mode = 'production';
exports.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    })
  ],
  hashedModuleIds: true
},
module.exports = exports;
