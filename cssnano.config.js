module.exports = {
  preset: ['default', {
    discardComments: {
      remove: function (comment) {
        return !(comment.startsWith('uncss') || comment.startsWith('!'))
      }
    }
  }]
}
