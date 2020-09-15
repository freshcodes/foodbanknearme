const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

export default config => {
  config.plugins.push(
    new webpack.DefinePlugin({
      MAPBOX_TOKEN: JSON.stringify('pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjazJlcTl6Y24wYzkwM21sNjNhejN3MjJiIn0.HWaEbpmmV4qw8SPAmo87Og')
    })
  )

  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'robots.txt' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'browserconfig.xml' }]))

  return config
}
