// Import mysql2 and dotenv modules
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
// Connection variables
host: 'localhost' ,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

module.exports = db; // Export connection