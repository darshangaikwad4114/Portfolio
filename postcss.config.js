module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          },
          minifyFontValues: false,
          autoprefixer: false
        }
      ]
    })
  ]
};
