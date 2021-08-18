const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

export default config => {
  config.plugins.push(
    new webpack.DefinePlugin({
      MAPBOX_TOKEN: JSON.stringify('pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjazJlcTl6Y24wYzkwM21sNjNhejN3MjJiIn0.HWaEbpmmV4qw8SPAmo87Og')
    })
  )

  config.plugins.push(new CopyWebpackPlugin({
    patterns: [
      { from: 'assets/robots.txt' },
      { from: 'assets/browserconfig.xml' },
      { from: 'assets/CNAME' }
    ]
  }))

  return config
}
