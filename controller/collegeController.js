
const db = require("../Config/db");

exports.createCollege = (req, res) => {
  const { college_code, college_name, address } = req.body;

  const sql = `
    INSERT INTO colleges (college_code, college_name, address)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [college_code, college_name, address], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "College Created" ,
               college_id:result.insertId
    });
  });
};

exports.getColleges = (req, res) => {
  db.query("SELECT * FROM colleges", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getCollegeByCode = (req, res) => {
  const sql = "SELECT * FROM colleges WHERE college_code=?";
  db.query(sql, [req.params.code], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};