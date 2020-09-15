import { usePrerenderData } from '@preact/prerender-data-provider'

const SetTitle = ({ url }) => {
  if (typeof window === 'undefined') return
  const [data] = usePrerenderData({ url })
  if (data && data.meta) {
    document.title = data.meta.find(meta => meta.property && meta.property === 'og:title').content
  }
}

export default SetTitle
