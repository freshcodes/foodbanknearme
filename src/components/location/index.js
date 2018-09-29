import { h, Component } from 'preact'

export default class Location extends Component {
  render (props, state) {
    const details = props.bank.properties
    let address2 = ''
    if (details.address2) {
      address2 = <span itemprop="postOfficeBoxNumber"> {details.address2} </span>
    }
    return (
      <div itemscope itemtype="http://schema.org/LocalBusiness">
        <strong><span itemprop="name">{details.name}</span></strong>
        <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
          <span itemprop="streetAddress"> {details.address} </span><br />
          {address2}{address2 ? <br /> : ''}
          <span itemprop="addressLocality"> {details.city}</span>,
          <span itemprop="addressRegion"> {details.state} </span>
          <span itemprop="postalCode"> {details.zip} </span>
        </div>
        <span itemprop="telephone">{details.phone}</span><br />
        <a href={`http://${details.url}`}><span itemprop="url">{details.url}</span></a>
      </div>
    )
  }
}
