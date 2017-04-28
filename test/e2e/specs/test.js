// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.containsText(".name", 'Ruby Buildpack')
      .click('a[href*="/buildpacks/ruby"]')
      .waitForElementVisible('.buildpackdetail', 5000)
      .assert.containsText('.name', 'Ruby Buildpack')
      .useXpath()
      .click("//ul[@class='versions']/[contains(text(), 'v1.6.35')]")
      .assert.containsText('h1', 'Ruby Buildpack v1.6.35')
      .end()
  }
}
