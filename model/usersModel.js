const db = require("../Config/db");

class UserModel {

  
  static createUser(data, callback) {
    const sql = `
      INSERT INTO users (firebase_uid, name, email, rollno, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, data, (err, result) => {
      if (err) {
        console.error("Create User Error:", err);
        return callback(err, null);
      }
      callback(null, result);
    });
  }

  
  static getUserByUID(uid, callback) {
    const sql = "SELECT * FROM users WHERE firebase_uid = ?";

    db.query(sql, [uid], (err, result) => {
      if (err) {
        console.error("Get User Error:", err);
        return callback(err, null);
      }
      callback(null, result);
    });
  }

}

module.exports = UserModel;