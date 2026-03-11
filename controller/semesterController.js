
const db = require("../Config/db");

exports.addSemester = (req, res) => {
  const { college_id, semester_number } = req.body;

  const sql = `
    INSERT INTO semesters (college_id, semester_number)
    VALUES (?, ?)
  `;

  db.query(sql, [college_id, semester_number], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Semester added" });
  });
};

exports.getSemesters = (req, res) => {
  db.query(
    "SELECT * FROM semesters WHERE college_id=?",
    [req.params.collegeId],
    (err, results) => {
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
    }
  );
};