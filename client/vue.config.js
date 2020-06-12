// const { PORT } = require('../server/index')

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