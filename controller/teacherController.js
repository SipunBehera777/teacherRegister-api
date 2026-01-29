const db = require("../Config/db");

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

  const insert_query = `
    INSERT INTO teachers 
    (full_name, gender, phone, email, designation, department, employee_code, password, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insert_query,
    [
      full_name,
      gender,
      phone,
      email,
      designation,
      department,
      employee_code,
      password,
      role
    ],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: "Employee code or email already exists"
          });
        }

        return res.status(500).json({
          message: "Database error",
          error: err.message
        });
      }

      return res.status(201).json({
        message: "Teacher registered successfully",
        teacherId: result.insertId
      });
    }
  );
};
