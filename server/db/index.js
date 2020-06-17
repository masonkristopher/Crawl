const mysql = require('mysql');
const util = require('util');

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'crawl';

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
  return query(mysqlQuery, [lat, lon]);
};

const postLocations = ({
  name, streetNumber, street, city, state, zip, lat, lon, formatted,
}) => {
  const mysqlQuery = 'INSERT IGNORE INTO Location VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  return query(mysqlQuery, [
    name,
    streetNumber,
    street,
    city,
    state,
    zip,
    lat,
    lon,
    formatted,
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
};
