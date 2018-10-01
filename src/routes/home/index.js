import { h } from 'preact'

const states = require('../../assets/states.js')
const stateCounts = require('../../assets/banks.js').stateCounts

const Home = () => (
  <div>
    <p>Pick a state below to see the Feeding America partner food banks.</p>
    <ul>{listItems()}</ul>
  </div>
)

const listItems = () => {
  return Object.entries(states).map(([st, name]) => {
    if (stateCounts[st]) { return <li><a href={`/${st.toLowerCase()}`}>{name}&nbsp;({stateCounts[st]})</a></li> }
  })
}

export default Home
