import { h, Component } from 'preact'
import { banks } from '../../assets/banks.js'

let mapboxAddedToDOM = false
function loadmapbox () {
  return new Promise((resolve, reject) => {
    if (mapboxAddedToDOM) return resolve()
    const js = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js'
    const css = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css'
    addJS(js, resolve, reject)
    addCSS(css)
    mapboxAddedToDOM = true
  })
}

function addJS (path, resolve, reject) {
  const script = document.createElement('script')
  script.onload = resolve
  script.onerror = reject
  script.src = path
  document.head.appendChild(script)
}

function addCSS (path) {
  const link = document.createElement('link')
  link.href = path
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

export default class Map extends Component {
  constructor () {
    super()
    this.state.loaded = false
  }

  setupMap () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjaXlkM2gwMHkwMHQ4Mndxa3V1bjA4djQ1In0.ORaR0rEPEdgA9EbMx7as0Q'
    // TODO: cache/store last zoom level and center point and restore here
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 2,
      center: [-98.5795, 39.8283],
      attributionControl: false
    })
    this.map.addControl(new mapboxgl.AttributionControl({ compact: true }))
    let nav = new mapboxgl.NavigationControl({ showCompass: false })
    this.map.addControl(nav, 'bottom-right')
    this.map.addControl(new mapboxgl.GeolocateControl())
    this.map.on('load', () => this.addBanksToMap())
  }

  flyToBank (bank) {
    this.map.flyTo({
      center: bank.geometry.coordinates,
      zoom: 12
    })
  }

  showPopup (bank) {
    let popups = document.getElementsByClassName('mapboxgl-popup')
    if (popups[0]) popups[0].remove()
    let html = `
      <h3>${bank.properties.name}</h3>
      <p>
        ${bank.properties.address}
        ${bank.properties.address2 ? '<br>' + bank.properties.address2 + '<br>' : ''}
        ${bank.properties.city}, ${bank.properties.state}  ${bank.properties.zip}<br>
        ${bank.properties.phone}<br>
        <a href="http://${bank.properties.url}">${bank.properties.url}</a>
      </p>
    `
    let popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(bank.geometry.coordinates)
      .setHTML(html)
      .addTo(this.map)
  }

  addBanksToMap () {
    this.map.addLayer({
      id: 'banks',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: banks
      },
      layout: {
        'icon-image': 'circle-15',
        'icon-allow-overlap': true
      }
    })

    this.map.on('click', (event) => {
      let features = this.map.queryRenderedFeatures(event.point, { layers: ['banks'] })
      let bank = features[0]
      if (!bank) return
      this.flyToBank(bank)
      this.showPopup(bank)
    })
  }

  componentWillMount () {
    loadmapbox()
      .then(() => this.setState({loaded:true}))
      .then(() => this.setupMap())
  }

  componentWillUnmount () {
    this.map.remove()
  }

  render (props, state) {
    return (
      <div id="mapContainer">
        <div id="map">{state.loaded ? '' : <p>Loading map...</p>}</div>
      </div>
    )
  }
}
