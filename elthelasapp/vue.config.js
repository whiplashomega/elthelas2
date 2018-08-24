module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: { 
      '/users/*': { target: 'http://0.0.0.0:8081' },
      '/users': { target: 'http://0.0.0.0:8081' },
      '/characters': { target: 'http://0.0.0.0:8081' },
      '/characters/*': { target: 'http://0.0.0.0:8081' }
    }
  },
  runtimeCompiler: true,
}