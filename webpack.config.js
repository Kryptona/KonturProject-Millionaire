const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distDirectory = path.resolve(__dirname, 'dist');
const publicDirectory = path.resolve(__dirname, 'public');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const srcDirectory = path.resolve(__dirname, 'src');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: distDirectory,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        include: srcDirectory,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [srcDirectory],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        include: nodeModulesDir,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000000,
              // outputPath: distDirectory,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      process: 'process/browser',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      ignoreOrder: true,
    }),
    new InjectManifest({
      swSrc: path.resolve(publicDirectory, 'sw.js'),
      swDest: 'sw.js',
      exclude: ['sw.js', 'manifest.json'],
      include: [/\.(bundle|chunk)\.(js|css)/, /\.(html|png|gif|svg|mp3)/],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicDirectory,
          to: distDirectory,
          globOptions: {
            ignore: ['**/sw.js', '**/index.html'],
          },
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
