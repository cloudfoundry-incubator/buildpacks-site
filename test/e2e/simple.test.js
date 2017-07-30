import { Selector } from 'testcafe'

fixture('Simple flow')
  .page('http://localhost:8080')

test('Flow', async t => {
  await t
    .resizeWindow(600, 800)
    .expect(Selector('.name').innerText).eql('Ruby Buildpack')
    .click('a.latestversion')
    .expect(Selector('.buildpackdetail h1').innerText).contains('Ruby Buildpack v1.')
    .click(Selector('button').withText('Show Outdated Versions'))
    .click(Selector('a').withText('v1.6.33'))
    .expect(Selector('.buildpackdetail h1').innerText).eql('Ruby Buildpack v1.6.33')
})

