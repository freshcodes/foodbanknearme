import { h } from 'preact'
import SetTitle from '../../components/set_title'
import Location from '../../components/location'
import { banks } from '../../assets/banks.js'

function banksByState (state) {
  return banks.features.filter((bank) => {
    return bank.properties.state.toLowerCase() === state
  })
}

const List = (props) => (
  <div>
    <SetTitle url={props.url} />
    <a href='/' class='backButton'>&laquo; Back</a>
    <ul>
      {banksByState(props.state).map((bank, i) => <li key={`${bank.properties.name}-${bank.properties.zip}`}><Location bank={bank} /></li>)}
    </ul>
  </div>
)

export default List
