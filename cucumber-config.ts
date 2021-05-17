import { browser, Config } from 'protractor';

export const config: Config = {
  directConnect: true,
  specs: ['../features/**/*.feature'],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './stepDefinitions/**/*.steps.js',
      './stepDefinitions/timeout.js',
      'path/to/step/definitions/**/*.steps.js' // accepts a glob
    ]
  },
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare: () => {
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(false);
  }
};
