const mysql = require("mysql2");

const db = mysql.createConnection({
    // Force port to be a Number
     host:"bazd50kqasdq3qim3jfr-mysql.services.clever-cloud.com",
  user: "uviytxyn8f0cqrb5",
  password:"cmncbyzh5YEFWmg06lXy",
  database: "bazd50kqasdq3qim3jfr"
  
});

db.connect((err) => {
    if (err) {
        console.error("❌ Connection Error Detail:", err.message);
    } else {
        console.log("✅ Database Connected!");
    }
});

module.exports = db;