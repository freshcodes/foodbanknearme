import { h } from 'preact'
import SetTitle from '../../components/set_title'

const states = require('../../assets/states.js')
const stateCounts = require('../../assets/banks.js').stateCounts

const Home = ({ url }) => (
  <div>
    <SetTitle url={url} />
    <p>Choose a state to see <a href='http://www.feedingamerica.org/find-your-local-foodbank/'>Feeding America</a> partner food banks.</p>
    <ul>{listItems()}</ul>
  </div>
)

const listItems = () => {
  return Object.entries(states).map(([st, name]) => {
    if (stateCounts[st]) { return <li><a href={`/${st.toLowerCase()}`}>{name}&nbsp;({stateCounts[st]})</a></li> }
  })
}

export default Home
