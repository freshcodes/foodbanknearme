import { h } from 'preact'
import Location from '../../components/location'
import { banks } from '../../assets/banks.js'

function banksByState (state) {
  return banks.features.filter((bank) => {
    return bank.properties.state.toLowerCase() === state
  })
}

const List = (props) => (
  <div>
    <a href='/' class='backButton'>&laquo; Back</a>
    <ul>
      {banksByState(props.state).map((bank, i) => <li><Location bank={bank} /></li>)}
    </ul>
  </div>
)

export default List
