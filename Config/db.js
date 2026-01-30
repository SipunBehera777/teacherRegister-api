const mysql = require("mysql2");

const db = mysql.createConnection({
    // Force port to be a Number
     host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("❌ Connection Error Detail:", err.message);
    } else {
        console.log("✅ Database Connected!");
    }
});

module.exports = db;