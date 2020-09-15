import './style'
import App from './components/app'
import { Provider as PrerenderProvider } from '@preact/prerender-data-provider'

export default (props) => {
  return (
    <PrerenderProvider value={props}>
      <App />
    </PrerenderProvider>
  )
}
