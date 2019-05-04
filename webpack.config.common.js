const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    watchOptions: { poll: true },
    compress: true,
    port: 8080,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { fix: true },
      // },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === 'development' },
          },
          'css-loader',
        ],
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      //   exclude: [
      //     path.join(__dirname, "src/manifest.json")
      //   ],
      // },
      {
        test: [
          /\.(png|svg|jpg|gif)$/,
          /\.(woff|woff2|eot|ttf|otf)$/,

          path.join(__dirname, 'src/assets/images/favicons/favicon.ico'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        }],
      },
      {
        test: path.join(__dirname, 'src/manifest.json'),
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Src: path.resolve(__dirname, './src/'),
      Scripts: path.resolve(__dirname, './src/scripts/'),
      Components: path.resolve(__dirname, './src/components'),
      Settings: path.resolve(__dirname, './src/components/settings'),
      Events: path.resolve(__dirname, './src/scripts/events'),
      Stylesheets: path.resolve(__dirname, './src/assets/css/'),
      Images: path.resolve(__dirname, './src/assets/images/'),
      Json: path.resolve(__dirname, './src/assets/json/'),
    },
  },
};
