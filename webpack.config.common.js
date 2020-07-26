const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "assets/app"),
  entry: path.resolve(__dirname, "./assets/app/index.js"),
  output: {
    path: path.resolve(__dirname, "assets/dist"),
    filename: "main.bundle.js",
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          }
        ],
      }
    ]
  }
}