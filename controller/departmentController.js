const db = require("../Config/db");

exports.createDepartment = (req, res) => {
  const { college_id, department_name } = req.body;

  const sql = `
    INSERT INTO departments (college_id, department_name)
    VALUES (?, ?)
  `;

  db.query(sql, [college_id, department_name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department Created" });
  });
};

exports.getDepartments = (req, res) => {
  const { college_id } = req.params;   

  if (!college_id) {
    return res.status(400).json({
      success: false,
      message: "college_id is required"
    });
  }

  db.query(
    "SELECT * FROM departments WHERE college_id = ?",
    [college_id],
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
