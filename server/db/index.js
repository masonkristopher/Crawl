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

const test = () => {
  const mysqlQuery = 'SELECT * FROM User;';
  return query(mysqlQuery);
};

module.exports = {
  test,
};
