const critical = require('critical')

// bulma breakpoints
// mobile: up to 768px
// tablet: from 769px
// desktop: from 1024px
// widescreen: from 1216px
// fullhd: from 1408px
// a height of 500 covers us well across all widths due to the hero resizing
const dimensions = [768, 1024, 1216, 1408].map((w) => ({ width: w, height: 500 }))

const files = ['index']
let current = 0

function process (file) {
  if (!file) return
  console.log(`processing ${file}.html`)
  critical.generate({
    inline: true,
    minify: true,
    base: 'public/',
    src: `${file}.html`,
    dest: `${file}.html`,
    dimensions: dimensions
  }, function (err, output) {
    if (err) {
      console.error(err)
    } else {
      console.log(`critical-path css finished for ${file}.html`)
      process(files[++current])
    }
  })
}
process(files[current])
