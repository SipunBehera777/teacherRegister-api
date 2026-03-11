
const db = require("../Config/db");
exports.addGroup = (req, res) => {
  const { section_id, group_name } = req.body;

  const sql = `
    INSERT INTO groups_table (section_id, group_name)
    VALUES (?, ?)
  `;

  db.query(sql, [section_id, group_name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Group added" });
  });
};

exports.getGroups = (req, res) => {
  db.query(
    "SELECT * FROM groups_table WHERE section_id=?",
    [req.params.sectionId],
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