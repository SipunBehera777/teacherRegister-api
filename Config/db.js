const mysql = require("mysql2");

const db = mysql.createPool({
   
     host:"bazd50kqasdq3qim3jfr-mysql.services.clever-cloud.com",
  user: "uviytxyn8f0cqrb5",
  password:"cmncbyzh5YEFWmg06lXy",
  database: "bazd50kqasdq3qim3jfr",

   waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
  
});

db.getConnection((err) => {
    if (err) {
        console.error(" Connection Error Detail:", err.message);
    } else {
        console.log(" Database Connected!");
    }
});

module.exports = db;