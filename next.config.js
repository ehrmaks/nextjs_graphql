const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.alias['@'] = path.resolve(__dirname, '/')
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components/')
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}