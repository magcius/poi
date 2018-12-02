exports.name = 'builtin:config-image'

exports.apply = api => {
  api.hook('onCreateWebpackConfig', config => {
    const filename = api.config.output.fileNames.image

    config.module
      .rule('image')
      .test([/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/])
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: filename,
        // inline the file if smaller than this size
        limit: api.config.assets.inlineImageMaxSize
      })

    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      // SVG files use file-loader directly, why?
      // See https://github.com/facebookincubator/create-react-app/pull/1180
      .loader('file-loader')
      .options({
        name: filename
      })
  })
}
