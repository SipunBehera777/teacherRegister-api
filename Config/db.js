const mysql = require("mysql2");

const db = mysql.createConnection({
    // Force port to be a Number
    host:"localhost",
    user:"root",
    password:"Sipun2006",
    database:"teacher_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Connection Error Detail:", err.message);
    } else {
        console.log("✅ Database Connected!");
    }
});

module.exports = db;