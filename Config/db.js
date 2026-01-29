const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST, // gondola.proxy.rlwy.net
    port: Number(process.env.DB_PORT), // 20276
    user: process.env.DB_USER, // root
    password: process.env.DB_PASSWORD, // sAdsoWGGqHGlWXhQrcxMWbnaWMDKFuGp
    database: process.env.DB_NAME, // railway
    // This helps if the MySQL version uses a different auth method
    authPlugins: {
        mysql_native_password: () => () => Buffer.from(process.env.DB_PASSWORD)
    }
});

db.connect((err) => {
    if (err) {
        console.error("❌ Connection Error Detail:", err.message);
    } else {
        console.log("✅ Database Connected!");
    }
});