const db = require("../Config/db");

class Teacher {

  /* ---------- CREATE ---------- */
  static create(data, callback) {
    const sql = `
      INSERT INTO teachers 
      (full_name, gender, phone, email, designation, department, employee_code, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.full_name,
        data.gender,
        data.phone,
        data.email,
        data.designation,
        data.department,
        data.employee_code,
        data.password,
        data.role
      ],
      callback
    );
  }

  /* ---------- UPDATE ---------- */
  static update(id, data, callback) {
    const sql = `
      UPDATE teachers 
      SET full_name=?, gender=?, phone=?, email=?, designation=?, 
          department=?, employee_code=?, role=?
      WHERE teacher_id=?
    `;

    db.query(
      sql,
      [
        data.full_name,
        data.gender,
        data.phone,
        data.email,
        data.designation,
        data.department,
        data.employee_code,
        data.role,
        id
      ],
      callback
    );
  }

  /* ---------- UPDATE PASSWORD ---------- */
  static updatePassword(id, password, callback) {
    const sql = `UPDATE teachers SET password=? WHERE id=?`;
    db.query(sql, [password, id], callback);
  }

  
  static delete(id, callback) {
    const sql = `DELETE FROM teachers WHERE teacher_id=?`;
    db.query(sql, [id], callback);
  }

  
  static getAll(callback) {
    const sql = `SELECT * FROM teachers`;
    db.query(sql, callback);
  }

  
  static checkEmployeeCode(code, id, callback) {
    const sql = `SELECT id FROM teachers WHERE employee_code=? AND id != ?`;
    db.query(sql, [code, id], callback);
  }
}

module.exports = Teacher;
