import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Map from './map'

// Code-splitting is automated for routes
import Home from '../routes/home'
import List from '../routes/list'
import About from '../routes/about'

export default class App extends Component {
	constructor () {
		super()

		this.state.showMap = window.innerWidth > 639

		let timeout = null
		window.addEventListener('resize', () => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => this.toggleMapByWindowWidth(), 50)
		})
	}

	toggleMapByWindowWidth () {
		if (this.state.showMapViaButton) return
		const newState = window.innerWidth > 639
		if (newState !== this.state.showMap) {
			this.setState({ showMap: newState })
		}
	}

	toggleMap = e => {
		this.setState({ showMap: !this.state.showMap, showMapViaButton: !this.state.showMap })
	}

	resetScroll () {
		const container = document.getElementById('contentContainer')
		if (container) contentContainer.scrollTop = 0
	}

	render (props, state) {
	  return (
			<div id='app' class={ state.showMap ? 'map' : ''}>
				<div id="contentContainer">
					<header>
						<a href="/">FoodBankNear.Me</a>
						<button aria-label="Toggle Map" aria-pressed={state.showMap ? "true" : "false"} onclick={this.toggleMap}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M5 34.035v2.24c3.432.755 10.167 3.587 10.769 14.174l4.562 1.212V31.44c-4.354 2.195-8.947 2.729-12.371 2.729A32.74 32.74 0 0 1 5 34.035zM5 40.345v7.244l6.653 1.768c-.784-6.239-4.317-8.321-6.653-9.012zM24.81 16.28l-.479.13v6.73a19.96 19.96 0 0 0 2.22-3.56 53.082 53.082 0 0 1-1.741-3.3zM47.963 29.761c.024.002 3.891.331 6.944-2.448 2.47-2.249 3.833-5.916 4.059-10.914l-14.54-3.861c-.032.207-.06.414-.109.617-.139.56-.362 1.196-.646 1.88v15.001a29.994 29.994 0 0 1 4.08-.287c.07.001.141.005.212.012zM5 30.043c3 .359 9.689.595 15.33-3.194v-10.44L5 12.34v17.703zM33.96 5c-1.8 0-3.85 1.13-5.22 2.89-1.12 1.43-1.58 3-1.25 4.31.35 1.44 1.58 3.79 3.01 6.21.01.01.01.01.01.02 1.141 1.91 2.391 3.86 3.45 5.44 1.95-2.92 4.59-7.11 5.85-9.96.011-.03.03-.06.04-.09.271-.61.471-1.17.58-1.62.33-1.31-.13-2.88-1.25-4.31C37.81 6.13 35.76 5 33.96 5zm0 7.9c-1.13 0-2.04-.92-2.04-2.05 0-1.12.91-2.04 2.04-2.04S36 9.73 36 10.85c0 1.13-.91 2.05-2.04 2.05zM30.769 49.952l1.158-.307 7.743-2.058V35.186c-1.914.792-3.545 1.897-4.852 3.344-3.366 3.726-3.98 8.755-4.049 11.422zM57.538 30.327c-4.079 3.667-8.987 3.491-9.87 3.423a25.47 25.47 0 0 0-3.998.309V47.59L59 51.663v-22.9a13.721 13.721 0 0 1-1.462 1.564z"/><path d="M33.961 29.401a2 2 0 0 1-1.632-.843c-.33-.465-1.762-2.502-3.381-5.039-1.354 2.177-2.927 3.924-4.618 5.319V51.66l2.435-.646c-.061-2.786.306-9.875 5.085-15.166 2.067-2.289 4.695-3.916 7.82-4.918v-8.518a135.259 135.259 0 0 1-4.077 6.145 2.002 2.002 0 0 1-1.632.844z"/></svg>	
						</button>
					</header>
					<main>
						<Router onChange={this.resetScroll}>
							<Home path='/' />
							<About path='/about' />
							<List path='/:state' />
						</Router>
					</main>
					<footer>
						<p>&copy; 2018 Fresh Codes LLC | <a href="/about">About</a></p>
					</footer>
				</div>
				{ state.showMap ? <Map /> : '' }
			</div>
	  )
	}
}
