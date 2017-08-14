const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: { poll: true },
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      // uncomment block below to fix linting errors automatically,
      // then comment out 'es-lint-loader' in above code block

      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { fix : true }
      // },
      
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: [
          /\.(png|svg|jpg|gif)$/,
          /\.(woff|woff2|eot|ttf|otf)$/,
          path.join(__dirname, 'src/manifest.json'),
          path.join(__dirname, 'src/index.html')
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Src: path.resolve(__dirname, './src/'),
      Scripts: path.resolve(__dirname, './src/scripts/'),
      Components: path.resolve(__dirname, './src/components'),
      Events: path.resolve(__dirname, './src/scripts/events'),
      Stylesheets: path.resolve(__dirname, './src/assets/css/'),
      Images: path.resolve(__dirname, './src/assets/images/'),
      Json: path.resolve(__dirname, './src/assets/json/')
    }
  }
};
