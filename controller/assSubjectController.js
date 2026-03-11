const db = require("../Config/db");

exports.assignSubject = (req, res) => {

    const { teacher_id, subject_id, section_id } = req.body;

    const sql = `
        INSERT INTO assign_subject
        (teacher_id, subject_id, section_id)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [teacher_id, subject_id, section_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Subject assigned to teacher successfully"
        });

    });

};


exports.getTeacherSubjects = (req, res) => {

  const teacher_id = req.params.teacher_id;

   const sql = `
  SELECT 
      a.id AS assignment_id,
      t.teacher_name,
      sub.subject_name,
      sec.section_name,
      sec.semester_id
  FROM assign_subject a
  JOIN teacher t ON a.teacher_id = t.teacher_id
  JOIN subjects sub ON a.subject_id = sub.id
  JOIN sections sec ON a.section_id = sec.id
  WHERE a.teacher_id = ?
  `;

  db.query(sql, [teacher_id], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err
      });
    }

    res.json({
      success: true,
      data: result
    });

  });

};