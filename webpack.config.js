const config = {
  devtool: "cheap-source-map",
  target: 'node',
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'restrpcapijs',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
module.exports = config;