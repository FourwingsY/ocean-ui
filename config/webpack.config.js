const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    // makes missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        test: [/\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash:6].[ext]',
        },
      },
      {
        test: [/\.woff$/, /\.eot$/],
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:6].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  mode: 'production',
  plugins: [new webpack.NamedModulesPlugin()],
};
