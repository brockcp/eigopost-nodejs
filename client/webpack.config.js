const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking', //blocks defer in script tag
      favicon: './src/favicon.ico',
    }),
  ],
  module:{
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|ico|gif)$/i,
        use:[
          {
            loader: 'file-loader'
          },
        ],
      },
      {
        test: /\.svg$/,
        use:[
          {
            loader: 'svg-url-loader',
            options:{
              limit: 10000,
            },
          },
        ],
      },
      {
        test:/\.css$/i,
        use:['style-loader','css-loader'],
      },
    ],
  },
  resolve:{
    mainFiles: ['index', 'Index'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  devServer:{
    port:3000,
    historyApiFallback: true,
  },
  cache: false,
  externals:{
    config: JSON.stringify({
      apiUrl: 'https://eigopost.com/api'
    })
  }
}
