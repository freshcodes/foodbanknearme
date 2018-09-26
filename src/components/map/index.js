import { h, Component } from 'preact'
import { banks } from '../../assets/banks.js'

function loadmapbox () {
  return new Promise((resolve, reject) => {
    const js = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js'
    const css = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css'
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = js
    const link = document.createElement('link')
    link.href = css
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    document.head.appendChild(script)
    // <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js'></script>
    // <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css' rel='stylesheet' />
  })
}


export default class Map extends Component {
  constructor () {
    super()
    this.state.loaded = false
  }

  setupMap () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjaXlkM2gwMHkwMHQ4Mndxa3V1bjA4djQ1In0.ORaR0rEPEdgA9EbMx7as0Q'
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 2,
      center: [-98.5795, 39.8283]
    })
    this.map.on('load', () => this.addBanksToMap())
  }

  addBanksToMap () {
    this.map.addLayer({
      id: 'locations',
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
  }

  componentWillMount () {
    loadmapbox()
      .then(() => this.setState({loaded:true}))
      .then(() => this.setupMap())
  }

  componentWillUnmount () {

  }

  render (props, state) {
    return (
      <div id="mapContainer">
        <div id="map">{state.loaded ? '' : <p>Loading map...</p>}</div>
      </div>
    )
  }
}
