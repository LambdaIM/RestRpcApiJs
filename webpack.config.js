const TerserPlugin = require('terser-webpack-plugin');

const confignode= {
  devtool: "cheap-source-map",
  target: 'node',
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/lib',
    filename: 'node.js',
    library: 'restrpcapijs',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  optimization: {
    minimize: false,
    minimizer: [
        new TerserPlugin({
            // 将多线程关闭
            parallel: false
        })
      ],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
const config = {
  devtool: "cheap-source-map",
  target: 'web',
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/lib',
    filename: 'browser.js',
    library: 'restrpcapijs',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: "lambdaApi", // string,
  },
  optimization: {
    minimize: false,
    minimizer: [
        new TerserPlugin({
            // 将多线程关闭
            parallel: false
        })
      ],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
module.exports = [config,confignode];