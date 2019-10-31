const WorkboxPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')

export default config => {
  config.plugins.push(
    new WorkboxPlugin.InjectManifest({
      swSrc: './service-worker.js',
      swDest: './service-worker.js',
      include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
    })
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      MAPBOX_TOKEN: JSON.stringify('pk.eyJ1IjoiZnJlc2hjb2RlcyIsImEiOiJjazJlcTl6Y24wYzkwM21sNjNhejN3MjJiIn0.HWaEbpmmV4qw8SPAmo87Og')
    })
  )

  return config
}
