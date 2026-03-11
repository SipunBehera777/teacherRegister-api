const db = require("../Config/db");
exports.addBatch = (req, res) => {
  const { college_id, batch_name, start_year, end_year } = req.body;

  const sql = `
    INSERT INTO batches (college_id, batch_name, start_year, end_year)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [college_id, batch_name, start_year, end_year], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Batch added" });
  });
};

exports.getBatches = (req, res) => {
  db.query(
    "SELECT * FROM batches WHERE college_id=?",
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