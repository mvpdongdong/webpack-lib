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
    },
    publicPath: '/assets/'
  },
  output: {
    path: path.resolve(__dirname, '../'),
    publicPath: '/assets/',
    // libraryTarget: 'umd',
    // library: 'libName'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: isProd ? ['babel-loader']: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/, resolve('src/lib')]
      },
      {
        test: /\.ejs$/,
        use: ['ejs-compiled?htmlmin']
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? 'style-loader!css-loader!postcss-loader!sass-loader'
          : 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'

      },
      {
        test: /\.css$/,
        loader: isProd
          ? 'style-loader!css-loader!postcss-loader'
          : 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap'

      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
          }
        }],
      }
    ]
  },
  plugins: [

  ]
};
