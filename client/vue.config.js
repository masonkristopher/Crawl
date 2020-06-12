<<<<<<< HEAD
// const { PORT } = require('../server/index')

=======
const { PORT } = require('../server/index')
// const path = require("path");


module.exports = {
  devServer: {
      host: '0.0.0.0',
      port: `${PORT}`,
      public: `13.85.81.104:${PORT}`,
      proxy: {
        "/api": {
          target: `http://0.0.0.0:${PORT}`,
        },
      },
  },
}


>>>>>>> b04f36c0a3d2361b047fcc19143f6b92adcd0cdf
// module.exports = {
//   devServer: {
//       host: '0.0.0.0',
//       port: `${PORT}`,
//       public: `13.66.15.121:${PORT}`,
//   },
// }


const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
      },
    },
  },
};