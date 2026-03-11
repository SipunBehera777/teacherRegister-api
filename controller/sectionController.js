
const db = require("../Config/db");
exports.addSection = (req, res) => {
  const { college_id, department_id, semester_id, section_name } = req.body;

  const sql = `
    INSERT INTO sections (college_id, department_id, semester_id, section_name)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [college_id, department_id, semester_id, section_name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Section added" });
  });
};

exports.getSections = (req, res) => {
  const { departmentId, semesterId } = req.params;

  const sql = `
    SELECT * FROM sections
    WHERE department_id=? AND semester_id=?
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