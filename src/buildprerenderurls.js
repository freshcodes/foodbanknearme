const fs = require('fs')
const states = require('../src/assets/states.js')
const stateCounts = require('../src/assets/banks.js').stateCounts
const json = [
  {
    url: '/',
    title: 'Food Bank Near Me',
    meta: [
      {
        name: 'description',
        content: 'Find your local Feeding America member food bank.'
      },
      {
        name: 'twitter:description',
        content: 'Find your local Feeding America member food bank.'
      },
      {
        property: 'og:title',
        content: 'Food Bank Near Me'
      },
      {
        property: 'og:description',
        content: 'Find your local Feeding America member food bank.'
      },
      {
        property: 'og:url',
        content: 'https://foodbanknear.me'
      }
    ],
  },
  {
    url: '/about',
    title: 'About FoodBankNear.Me',
    meta: [
      {
        name: 'description',
        content: 'Learn about this progressive web app.'
      },
      {
        name: 'twitter:description',
        content: 'Learn about this progressive web app.'
      },
      {
        property: 'og:title',
        content: 'About FoodBanksNear.Me'
      },
      {
        property: 'og:description',
        content: 'Learn about this progressive web app.'
      },
      {
        property: 'og:url',
        content: 'https://foodbanknear.me/about'
      }
    ]
  }
]

Object.entries(states).forEach(([st, name]) => {
  if (stateCounts[st]) {
    const title = `Food Banks In ${name}`
    const description = `Find local Feeding America member food banks in ${name}.`
    json.push({
      url: `/${st.toLowerCase()}`,
      title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          name: 'twitter:description',
          content: description
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:url',
          content: `https://foodbanknear.me/${st.toLowerCase()}`
        }
      ]
    })
  }
})

fs.writeFileSync('prerender-urls.json', JSON.stringify(json))
