import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

import Location from '../src/components/location'
import { banks } from '../src/assets/banks.js'

describe('Location details component', () => {
  test('Location parent has expected attributes', () => {
    let bank = banks.features[0]
    const context = shallow(<Location bank={bank} />)
    expect(context.is('[itemscope]')).toBe(true)
    expect(context.is('[itemtype="http://schema.org/LocalBusiness"]')).toBe(true)
    expect(context.hasClass('bankDetails')).toBe(true)
  })

  test('Location name is present', () => {
    let bank = banks.features[0]
    const context = shallow(<Location bank={bank} />)
    const name = context.find('[itemprop="name"]')
    expect(name.text()).toBe(bank.properties.name)
  })

  test('Location has link', () => {
    let bank = banks.features[0]
    const context = shallow(<Location bank={bank} />)
    const link = context.find(`[href="http://${bank.properties.url}"]`)
    expect(link.text()).toBe(bank.properties.url)
  })
})
