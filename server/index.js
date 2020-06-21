const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const path = require('path');
const { apiRouter } = require('./api/index');

const app = express();

const PORT = process.env.PORT || 8081;

const CLIENT_PATH = path.join(__dirname, '../client/dist');
// const corsOptions = {
//   origin: [process.env.VUE_APP_MY_IP, process.env.VUE_APP_MY_DNS],
// };
app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use('/api', apiRouter);


if (process.env.DEPLOYED === true) {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/crawl.southcentralus.cloudapp.azure.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/crawl.southcentralus.cloudapp.azure.com/fullchain.pem'),
  };
  https.createServer(options, app).listen(PORT);
} else {
  app.listen(PORT, () => {
    console.log(`Server Listening on Port:${PORT} 🚀`);
  });
}

module.exports = {
  PORT,
};
