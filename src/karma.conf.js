// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    // client: {
    //   useIframe: false
    // },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      // require('karma-electron'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // customLaunchers: {
    //   'visibleElectron': {
    //     base: 'Electron',
    //     flags: ['--show']
    //   }
    // },
    browsers: ['Chrome'],
    singleRun: true
  });
};
// var webpackConfig = require('./webpack.test');

// module.exports = function (config) {
//   var _config = {
//       basePath: '',

//       frameworks: ['jasmine', '@angular-devkit/build-angular'],

//       files: [{ pattern: './spec-bundle.js', watched: false }],

//       preprocessors: { './spec-bundle.js': ['electron', 'coverage', 'webpack', 'sourcemap'] },

//       webpack: webpackConfig,

//       coverageReporter: {
//           dir: '../coverage/',
//           reporters: [
//               {
//                   type: 'text-summary',
//                   type: 'json',
//                   type: 'html',
//               }
//           ]
//       },

//       webpackMiddleware: {
//           stats: 'errors-only'
//       },

//       webpackServer: {
//           noInfo: true
//       },

//       reporters: ['spec', 'coverage'],
//       port: 9876,
//       colors: true,
//       logLevel: config.LOG_INFO,
//       autoWatch: false,
//       browsers: ['Electron'],
//       singleRun: true,

//       client: {
//           useIframe: false
//       }
//   };

//   config.set(_config);
// }
