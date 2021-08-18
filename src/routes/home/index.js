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
    const count = stateCounts[st]
    const ref = st.toLowerCase()
    return count ? <li key={ref}><a href={`/${ref}`}>{name}&nbsp;({stateCounts[st]})</a></li> : null
  })
}

export default Home
