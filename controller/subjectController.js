
const db = require("../Config/db");

exports.addSubject = (req, res) => {
  const { college_id, department_id, semester, subject_name, subject_code, credits } = req.body;

  const sql = `
    INSERT INTO subjects
    (college_id, department_id, semester, subject_name, subject_code, credits)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [college_id, department_id, semester, subject_name, subject_code, credits],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Subject added" });
    }
  );
};

exports.getSubjects = (req, res) => {
  const { departmentId, semesterId } = req.params;

  const sql = `
    SELECT * FROM subjects
    WHERE department_id=? AND semester=?
  `;

  db.query(sql, [departmentId, semesterId], (err, results) => {
           if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      return res.status(200).json({
        success: true,
        data: results
      });
  });
};