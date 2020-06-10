const express = require('express');
// const parse = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8081;

const CLIENT_PATH = path.join(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server Listening on Port:${PORT} 🚀`);
});
