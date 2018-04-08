// webpack config for storybook
// this will add some options on storybook's webpack config
const fs = require('fs');
const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: [/\.woff2$/],
    loader: 'file-loader'
  });

  storybookBaseConfig.module.rules.push({
    test: [/\.jpe?g$/, /\.png$/],
    loader: 'file-loader'
  });

  storybookBaseConfig.module.rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      configFile: '.storybook/tsconfig.json'
    }
  });

  storybookBaseConfig.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
  storybookBaseConfig.resolve.plugins = [
    new TsConfigPathsPlugin({
      configFile: '.storybook/tsconfig.json'
    })
  ];

  return storybookBaseConfig;
};
