const fs = require('fs')
const states = require('../src/assets/states.js')
const stateCounts = require('../src/assets/banks.js').stateCounts
const json = [
  { url: '/', title: 'Food Banks Near Me' },
  { url: '/about', title: 'About | Food Banks Near Me' }
]

Object.entries(states).forEach(([st, name]) => {
  if (stateCounts[st]) { json.push({ url: `/${st.toLowerCase()}`, title: `Food Banks In ${name}` }) }
})

fs.writeFileSync('prerender-urls.json', JSON.stringify(json))
