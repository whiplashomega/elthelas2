// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ["Chrome-headless"],
    customLaunchers: {
      "Chrome-headless": {
        base: 'Chrome',
        flags: ['--headless', '--remote-debugging-port=9222', '--no-sandbox']
      }
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js',
     {pattern: './static/**/*', watched: false, included: false, served: true},
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    proxies:  {
      '/static/': './static/'
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
