import { h } from 'preact'
import Location from '../../components/location'
import { banks } from '../../assets/banks.js'

function banksByState (state) {
  return banks.features.filter((bank) => {
    return bank.geometry.properties.state.toLowerCase() == state
  })
}

const List = (props) => (
  <div>
    <p><a href="javascript:history.go(-1);" class="backButton">&laquo; Back</a></p>
    <ul>
      {banksByState(props.state).map((bank, i) => <li><Location bank={bank} /></li>)}
    </ul>
  </div>
)

export default List
