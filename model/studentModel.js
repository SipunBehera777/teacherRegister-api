
const db = require("../Config/db");
const bcrypt = require("bcrypt");

class Students{
  static register(data,callback){
     
    const query='INSERT INTO students(collegeID,fullname, rollno, regd_no, mobileno, email, batch_id, dept_id, sem_id, section_id, group_id, image,firebase_uid)      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query,
       [
        data.collegeID,
        data.fullname,
        data.rollno,
        data.regd_no,
        data.mobileno,
        data.email,
        data.batch_id,
        data.dept_id,
        data.sem_id,
        data.section_id,
        data.group_id,
       
        data.image,
        data.firebase_uid
        
      ],
      callback
    );
     

  }

   static getAll(callback) {
    db.query("SELECT * FROM students", callback);
  }


  static delete(id, callback) {
    let sql = `DELETE FROM students WHERE id=?`;
    db.query(sql, [id], callback);
  }

 
 static filterStudent(collegeID, batch_id, dept_id, section_id, group_id) {

  return new Promise((resolve, reject) => {

    let query = `
      SELECT 
        s.id,
        s.fullname,
        s.email,
        s.rollno,
        s.mobileno,
        s.image,
        d.department_name,
        sec.section_name,
        g.group_name,
        b.batch_name,
        sem.semester_number
      FROM students s
      JOIN departments d ON s.dept_id = d.id
      JOIN sections sec ON s.section_id = sec.id
      JOIN groups_table g ON s.group_id = g.id
      JOIN batches b ON s.batch_id = b.id
      JOIN semesters sem ON s.sem_id = sem.id
      WHERE s.collegeID = ?
    `;

    let params = [collegeID];

    if (batch_id) {
      query += ' AND s.batch_id = ?';
      params.push(batch_id);
    }

    if (dept_id) {
      query += ' AND s.dept_id = ?';
      params.push(dept_id);
    }

    if (section_id) {
      query += ' AND s.section_id = ?';
      params.push(section_id);
    }

    if (group_id) {
      query += ' AND s.group_id = ?';
      params.push(group_id);
    }

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("DB Filter Error:", err);
        return reject(err);
      }
      resolve(results);
    });

  });
}


 

static filterStudent_Attendance(collegeID, batch_id, dept_id, section_id, sem_id) {

  return new Promise((resolve, reject) => {

    let query = `
      SELECT 
        s.id,
        s.collegeID,
        s.fullname,
        s.email,
        s.rollno,
        s.mobileno,
        s.image,
        d.department_name,
        sec.section_name,
        g.group_name,
        b.batch_name,
        sem.semester_number
      FROM students s
      JOIN departments d ON s.dept_id = d.id
      JOIN sections sec ON s.section_id = sec.id
      JOIN groups_table g ON s.group_id = g.id
      JOIN batches b ON s.batch_id = b.id
      JOIN semesters sem ON s.sem_id = sem.id
      WHERE s.collegeID = ?
    `;

    let params = [collegeID];

    if (batch_id) {
      query += ' AND s.batch_id = ?';
      params.push(batch_id);
    }

    if (dept_id) {
      query += ' AND s.dept_id = ?';
      params.push(dept_id); 
    }

    if (section_id) {
      query += ' AND s.section_id = ?';
      params.push(section_id);
    }

    if (sem_id) {
      query += ' AND s.sem_id = ?';
      params.push(sem_id);
    }

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("DB Filter Error:", err);
        return reject(err);
      }
      resolve(results);
    });

  });
}





static getStudentById(id,callback){

  let query = `
      SELECT 
        s.id,
        s.collegeID,
        s.fullname,
        s.email,
        s.rollno,
        s.mobileno,
        s.image,
        d.department_name,
        sec.section_name,
        g.group_name,
        b.batch_name,
        sem.semester_number
      FROM students s
      JOIN departments d ON s.dept_id = d.id
      JOIN sections sec ON s.section_id = sec.id
      JOIN groups_table g ON s.group_id = g.id
      JOIN batches b ON s.batch_id = b.id
      JOIN semesters sem ON s.sem_id = sem.id
      WHERE s.collegeID = ?
    `;
   db.query(query, [id], callback);

}




static updateStudent(id,data,callback){
 let query = `
UPDATE students 
SET fullname=?, rollno=?, regd_no=?, mobileno=?, email=?, 
batch=?, department=?, sem=?, section=?, \`group\`=?, image=? 
WHERE id=?`;

   db.query(query,
       [
       
        data.fullname,
        data.rollno,
        data.regd_no,
        data.mobileno,
        data.email,
        data.batch,
        data.department,
        data.sem,
        data.section,
        data.group,
       
        data.image
        ,id
      ],
      callback
    )

    ;
}

    

      


}

module.exports = Students;
