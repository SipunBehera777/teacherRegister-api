const db = require("../Config/db");

class StudyMaterial {
  static addMaterial(data, callback) {
    const sql = `INSERT INTO study_materials 
      (title, file_url, public_id, teacher_id, college_id, department_id, batch_id, section_id, semester_id, subject_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
      data.title, data.file_url, data.public_id,
      data.teacher_id, data.college_id, data.department_id,
      data.batch_id, data.section_id, data.semester_id, data.subject_id
    ], callback);
  }

  static getMaterials(f, callback) {
    const sql = `SELECT * FROM study_materials 
      WHERE department_id=? AND batch_id=? AND section_id=? AND semester_id=? AND subject_id=? 
      ORDER BY created_at DESC`;

    db.query(sql, [f.department_id, f.batch_id, f.section_id, f.semester_id, f.subject_id], callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM study_materials WHERE id=?", [id], callback);
  }

  static deleteMaterial(id, callback) {
    db.query("DELETE FROM study_materials WHERE id=?", [id], callback);
  }

  static checkAssignment(teacher_id, subject_id, section_id, batch_id, callback) {
    // This query checks if the teacher is actually linked to these specific parameters
    const sql = `
        SELECT * FROM assign_subject 
        WHERE teacher_id = ? AND subject_id = ? AND section_id = ? AND batch_id = ?
    `;
    db.query(sql, [teacher_id, subject_id, section_id, batch_id], callback);
}
}



module.exports = StudyMaterial;