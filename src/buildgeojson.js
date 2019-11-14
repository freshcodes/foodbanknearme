const parser = require('fast-xml-parser')
const fs = require('fs')
const xml = fs.readFileSync('src/assets/FeedingAmericaOrganizations.xml', 'utf8')
const jsonObj = parser.parse(xml)
const count = jsonObj.ArrayOfOrganization.Organization.length

const stateCounts = {}
const geoObj = {
  type: 'FeatureCollection'
}
geoObj.features = jsonObj.ArrayOfOrganization.Organization.map((organization) => {
  process.stdout.write('.')

  const state = organization.MailAddress.State
  if (!stateCounts[state]) stateCounts[state] = 0
  stateCounts[state]++

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        organization.MailAddress.Longitude,
        organization.MailAddress.Latitude
      ]
    },
    properties: {
      name: organization.FullName,
      address: organization.MailAddress.Address1,
      address2: organization.MailAddress.Address2,
      city: organization.MailAddress.City,
      state: organization.MailAddress.State,
      zip: organization.MailAddress.Zip,
      url: organization.URL,
      phone: organization.Phone
    }
  }
})

console.log(`\nGenerated ${geoObj.features.length} points from ${count} banks found in the XML file.`)

const js = `
module.exports = {
  banks: ${JSON.stringify(geoObj)},
  stateCounts: ${JSON.stringify(stateCounts)}
}
`
fs.writeFileSync('src/assets/banks.js', js)
