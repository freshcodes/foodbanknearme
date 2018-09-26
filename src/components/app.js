import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'
import Map from './map'

// Code-splitting is automated for routes
import Home from '../routes/home'
import List from '../routes/list'

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
	  this.currentUrl = e.url
	};

	render () {
	  return (
			<div id='app'>
				<div id="main">
					<div id="header">
						<a href="/">FoodBankNear.Me</a>
					</div>
					<div id="nav">
						<a href="">By State</a>
						<a href="">Map</a>
					</div>
					<div id="body">
						<Router onChange={this.handleRoute}>
							<Home path='/' />
							<List path='/:state' />
						</Router>
					</div>
					<div id="footer">
						&copy; Fresh Codes LLC
					</div>
				</div>
				<Map />
			</div>
	  )
	}
}
