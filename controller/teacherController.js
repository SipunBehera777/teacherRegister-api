const Teacher = require("../model/teacherModel");

exports.registerTeacher = (req, res, next) => {

  const {
    full_name,
    gender,
    phone,
    email,
    designation,
    department,
    employee_code,
    password,
    role
  } = req.body;

  if (
    !full_name ||
    !gender ||
    !phone ||
    !email ||
    !designation ||
    !department ||
    !employee_code ||
    !password ||
    !role
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  Teacher.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: "Teacher Added Successfully",
      teacherId: result.insertId
    });
  });

};


exports.deleteTeacher=(req,res,next)=>{
  const id=req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Teacher ID required" });
  }

  Teacher.delete(id, err => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Teacher deleted Successfully" });
  });
};


exports.updateTeacher = (req, res) => {

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Teacher ID required" });
  }

  Teacher.update(id, req.body, err => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Teacher Updated Successfully" });
  });
};
exports.getAll = (req, res) => {
  Teacher.getAll((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(results);
  });
};

