import { Selector } from 'testcafe'

fixture('Simple flow')
  .page('http://localhost:8080')

test('Flow', async t => {
  await t
    .resizeWindow(600, 800)
    .expect(Selector('.name').innerText).eql('Binary Buildpack')
    .click('a.latestversion')
    .expect(Selector('.buildpackdetail h1').innerText).contains('Binary Buildpack v')
    .click(Selector('button').withText('Show Outdated Versions'))
    .click(Selector('a').withText('v1.0.26'))
    .expect(Selector('.buildpackdetail h1').innerText).eql('Binary Buildpack v1.0.26')
})
