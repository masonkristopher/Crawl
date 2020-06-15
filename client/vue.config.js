const { PORT } = require('../server/index')


module.exports = {
  devServer: {
      host: '0.0.0.0',
      port: `${PORT}`,
      public: `13.85.81.104:${PORT}`,
      proxy: {
        "/api": {
          target: `https//localhost:${PORT}`,
          secure: false,
        },
      },
  },
}
