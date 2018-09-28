import { h } from 'preact'

const About = () => (
  <div>
    <p><a href="javascript:history.go(-1);" class="backButton">&laquo; Back</a></p>
    <p>
      This is a for-fun project by Fresh Codes LLC.
      We're always exploring new technology and hopefully this site also
      helps a few people find their local food bank.</p>
    <p>The food banks found in this site are <a href="http://www.feedingamerica.org/find-your-local-foodbank/">Feeding America</a> members. These banks
      can connect you to a an even more local facitility. Often times these banks
      offer quite a few services to their communities.</p>
    <p>This site is not associated with Feeding America.</p>
    <p><a href="https://thenounproject.com/search/?q=map&i=1953157">Map by Icon Lauk from the Noun Project</a></p>
    <p>If you need to get in touch please email us: <a href="mailto:foodbanknearme@fresh.codes">foodbanknearme@fresh.codes</a>.</p>
    <p></p>
  </div>
)

export default About
