const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
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
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve:{
    mainFiles: ['index', 'Index'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
  ],
  devServer:{
    port:3000,
    historyApiFallback: true,
  },
  externals:{
    config: JSON.stringify({
      apiUrl: 'https://eigopost.com/api'
    })
  }
}
