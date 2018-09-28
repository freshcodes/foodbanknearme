import { h } from 'preact'

import { states } from '../../assets/states.js'
import { stateCounts } from '../../assets/banks.js'

const Home = () => (
  <div>
    <p>Pick a state below to see the Feeding America partner food banks.</p>
    <ul>
      {Object.entries(states).map(([st, name]) => <li><a href={`/${st.toLowerCase()}`}>{name}&nbsp;({stateCounts[st] || 0})</a></li>)}
    </ul>
  </div>
)

export default Home
