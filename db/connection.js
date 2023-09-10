const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
// connection variables
host: process.env.host,
user: process.env.user,
password: process.env.password,
database: process.env.database
});

module.exports = db; // export connection