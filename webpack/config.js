const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  source: path.join(__dirname, '../source'),
  css: path.join(__dirname, '../source/assets/css/'),
  javascript: path.join(__dirname, '../source/js'),
  build: path.join(__dirname, '../build'),
};

const outputFiles = require('./output-files').outputFiles;

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const HYDRATE = process.env.HYDRATE === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// plugins
const plugins = [
  // Extracts CSS to a file
  new MiniCssExtractPlugin({
    filename: outputFiles.css,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      SERVER_RENDER: JSON.stringify(SERVER_RENDER) === 'true',
      HYDRATE: JSON.stringify(HYDRATE) === 'true',
    },
  }),
];

if (IS_DEVELOPMENT) {
  plugins.push(
    new webpack.NamedModulesPlugin()
  );
}

// rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
];

// For both production and server ExtractTextPlugin is used
if (IS_PRODUCTION || SERVER_RENDER) {
  rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true,
          },
        },
        'postcss-loader',
      ],
    }
  );
} else {
  rules.push(
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }
  );
}

// resolve
const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    'node_modules',
    paths.javascript,
  ],
};

// cli stats
const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  SERVER_RENDER,
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  stats,
};
