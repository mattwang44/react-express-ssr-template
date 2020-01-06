module.exports = {
    entry: './src/server/server.js',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'entry.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    stats: 'errors-only'
  };