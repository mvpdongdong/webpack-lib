const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

process.traceDeprecation = true;

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  entry: './src/index',
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    contentBase: './example',
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    inline: true,
    watchContentBase: true,
    open: true,
    overlay: true,
    stats: {
      colors: true
    }
  },
  output: {
    path: path.resolve(__dirname, '../'),
    publicPath: '/assets/',
    // libraryTarget: 'umd',
    // library: 'libName'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: isProd ? ['babel-loader']: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/, resolve('src/lib')]
      },
      {
        test: /.js$/,
        enforce: 'post', // post-loader处理
        loader: 'es3ify-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled?htmlmin'
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? 'style!css!postcss!sass'
          : 'style?sourceMap!css?sourceMap!postcss?sourceMap!sass?sourceMap'

      },
      {
        test: /\.css$/,
        loader: isProd
          ? 'style!css!postcss'
          : 'style?sourceMap!css?sourceMap!postcss?sourceMap'

      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [

  ]
};
