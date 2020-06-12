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


// module.exports = {
//   outputDir: path.resolve(__dirname, "../public"),
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8081",
//       },
//     },
//   },
// };