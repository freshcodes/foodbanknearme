import { h, Component } from 'preact'
const banks = require('../../assets/banks.js').banks

let mapboxAddedToDOM = false
function loadmapbox () {
  return new Promise((resolve, reject) => {
    if (mapboxAddedToDOM) return resolve()
    const js = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js'
    const css = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css'
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
  state = {
    loaded: false,
    offline: !navigator.onLine
  }

  loadMap () {
    loadmapbox()
      .then(() => this.setState({ loaded: true }))
      .then(() => this.setupMap())
  }

  setupMap () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjaXlkM2gwMHkwMHQ4Mndxa3V1bjA4djQ1In0.ORaR0rEPEdgA9EbMx7as0Q'
    const zoom = parseInt(localStorage.getItem('lastMapZoom'), 10) || 2
    const center = JSON.parse(localStorage.getItem('lastMapCenter') || '0') || [-98.5795, 39.8283]
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: zoom,
      center: center,
      attributionControl: false
    })
    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
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
    new mapboxgl.Popup({ closeOnClick: false })
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

    this.map.on('moveend', this.mapMoveEnd)
  }

  mapMoveEnd = () => {
    localStorage.setItem('lastMapZoom', this.map.getZoom().toString())
    localStorage.setItem('lastMapCenter', JSON.stringify(this.map.getCenter()))
  }

  offline = () => {
    this.setState({ offline: true })
    this.map.remove()
  }

  online = () => {
    this.setState({ offline: false })
    this.loadMap()
  }

  componentWillMount () {
    window.addEventListener('offline', this.offline)
    window.addEventListener('online', this.online)
    if (!this.state.offline) this.loadMap()
  }

  componentWillUnmount () {
    window.removeEventListener('offline', this.offline)
    window.removeEventListener('online', this.online)
    this.map.remove()
  }

  render (props, state) {
    let offline = state.offline && <p>You're currently offline. The map will load once reconnected.</p>
    let loading = !state.loaded && <p>Loading the map...</p>
    let message = offline || loading || ''
    return (
      <div id='mapContainer'>
        <div id='map'>
          {message}
        </div>
      </div>
    )
  }
}
