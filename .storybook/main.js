
const path = require('path')

module.exports = {
  stories: ['../app/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
  ],
  webpackFinal: (config) => {
    const rules = [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ]

    rules.forEach((rule) => config.module.rules.push(rule))
    config.resolve = {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    }
    config.node = {
      fs: 'empty',
    }
    delete config.optimization
    delete config.performance
    return config
  },
}
