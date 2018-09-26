import { h } from 'preact'
import style from './style'

import { states } from '../../assets/states.js'
import { stateCounts } from '../../assets/banks.js'

const Home = () => (
  <div class={style.home}>
    <ul>
      {Object.entries(states).map(([st, name]) => <li><a href={`/${st.toLowerCase()}`}>{name}&nbsp;({stateCounts[st] || 0})</a></li>)}
    </ul>
  </div>
)

export default Home
