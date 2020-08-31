module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/9gag/' // Thay tên repository của các bạn vào đây nhé
    : '/'
}