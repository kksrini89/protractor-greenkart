import { browser, Config } from 'protractor';

export const config: Config = {
  directConnect: true,
  specs: ['e2e/**/*.e2e.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare: () => {
    browser.manage().window().maximize();
  }
};
