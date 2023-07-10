
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        ws: false,
      },
      '/users': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        ws: false,
      },
      '/menu': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        ws: false,
      },

    }
  }
};