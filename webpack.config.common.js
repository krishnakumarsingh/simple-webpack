const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');

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
    new ImageminPlugin({
      externalImages: {
        context: '.',
        sources: glob.sync('assets/app/images/**/*.{png,jpg,jpeg,gif,svg}'),
        destination: 'assets/dist/images',
        fileName: '[path][name].[ext]'
      }
    }),
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