const { PORT } = require('../server/index')


module.exports = {
  devServer: {
      host: '0.0.0.0',
      port: `8082`,
      proxy: {
        "/api/auth/google/callback": {
          target: `http://0.0.0.0:${PORT}`,
          secure: false,
        },
        "/api/auth/google/login": {
          target: `http://0.0.0.0:${PORT}`,
          secure: false,
        },
        "/api/auth/google": {
          target: `http://0.0.0.0:${PORT}`,
          secure: false,
        },
      },
  },
}
