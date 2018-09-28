import { h } from 'preact'
import style from './style'
import { banks } from '../../assets/banks.js'

function banksByState (state) {
  return banks.features.filter((bank) => {
    return bank.geometry.properties.state.toLowerCase() == state
  })
}

const List = (props) => (
  <div class={style.list}>
    <p><a href="javascript:history.go(-1);">&lt; Back</a></p>
    <ul>
      {banksByState(props.state).map((bank, i) => <li>{bank.geometry.properties.name}</li>)}
    </ul>
  </div>
)

export default List
