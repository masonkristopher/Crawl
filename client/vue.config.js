const { PORT } = require('../server/index')

module.exports = {
  devServer: {
    public: `13.66.15.121:${PORT}`,
  }
};
console.log(PORT);
// const path = require("path");
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