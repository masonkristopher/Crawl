const mysql = require('mysql');
const util = require('util');
// allowing access to our environmental variables, in a .env file in root directory
require('dotenv').config({ path: '../.env' });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'crawl';

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected!');
  }
});

// TEST QUERY
const test = () => {
  const mysqlQuery = 'SELECT * FROM User;';
  return query(mysqlQuery);
};

// USER QUERIES
const getUser = (email) => {
  const mysqlQuery = 'SELECT * FROM User WHERE Email = ?;';
  return query(mysqlQuery, [email]);
};
const postUser = ({
  username, nameFirst, nameLast, phoneNumber, email, imageUrl,
}) => {
  const mysqlQuery = 'INSERT IGNORE INTO User VALUES(null, ?, ?, ?, ?, ?, ?);';
  return query(mysqlQuery, [username, nameFirst, nameLast, phoneNumber, email, imageUrl]);
};

// CRAWL QUERIES
const getCrawl = (idCreator) => {
  const mysqlQuery = 'SELECT * FROM Crawl WHERE Id_Creator = ?;';
  return query(mysqlQuery, [idCreator]);
};
const postCrawl = ({
  idCreator, title, crawlDate, crawlTime,
}) => {
  const mysqlQuery = 'INSERT INTO Crawl VALUES(null, ?, ?, ?, ?);';
  return query(mysqlQuery, [
    idCreator,
    title,
    crawlDate,
    crawlTime,
  ]);
};

// LOCATION QUERIES
const getLocation = (
  lat, lon,
) => {
  const mysqlQuery = 'SELECT * FROM Location WHERE Lat = ? && Lon = ?;';
  return query(mysqlQuery, [
    lat,
    lon,
  ]);
};
// address:"3340 Canal St, New Orleans"
// lat:29.9696163
// lng:-90.0939346
// name:"The Holy Ground Irish Pub
const postLocations = ({
  address, lat, lng, name,
}) => {
  const mysqlQuery = 'INSERT IGNORE INTO Location VALUES(null, ?, ?, ?, ?);';
  return query(mysqlQuery, [
    address,
    lat,
    lng,
    name,
  ]);
};

// JOIN QUERIES
const locationCrawl = (idLocation, idCrawl, order) => {
  const mysqlQuery = 'INSERT IGNORE INTO Location_Crawl VALUES(null, ?, ?, ?);';
  return query(mysqlQuery, [
    idLocation,
    idCrawl,
    order,
  ]);
};

module.exports = {
  test,
  // USERS
  getUser,
  postUser,
  // CRAWLS
  getCrawl,
  postCrawl,
  // LOCATIONS
  getLocation,
  postLocations,
  // JOIN
  locationCrawl,
};
