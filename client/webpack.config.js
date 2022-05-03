const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // File entry point
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // File Output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML PLUGIN TO GENERATE HTML FILES
      new HtmlWebpackPlugin({
        template: './index.html',
        title:'JATE - Another Text Editor'
      }),

      // INJECT MANIFEST FOR SERVICE WORKER
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      // WEBPACK MANIFEST
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE - Another Text Editor',
        short_name: 'JATE',
        description: 'Always reach your notes. Online, or offline',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            // Sources and Requirede Sizes of logo
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // CSS Loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel Loader
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
