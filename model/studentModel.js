
const db = require("../Config/db");
const bcrypt = require("bcrypt");

class Students{
  static register(data,callback){
     
    const query='INSERT INTO students(collegeID,fullname, rollno, regd_no, mobileno, email, batch, department, sem, section, \`group\`, image,firebase_uid)      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';

    db.query(query,
       [
        data.collegeID,
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

 
  static filterStudent(collegeID, batch, department, section, group) {

  return new Promise((resolve, reject) => {

    let query = 'SELECT * FROM students WHERE collegeID = ?';
    let params = [collegeID];

    if (batch) {
      query += ' AND batch = ?';
      params.push(batch);
    }

    if (department) {
      query += ' AND department = ?';
      params.push(department);
    }

    if (section) {
      query += ' AND section = ?';
      params.push(section);   
    }

    if (group) {
      query += ' AND `group` = ?';  
      params.push(group);
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


 static filterStudent_Attendance(collegeID, batch, department, section,semester) {

  return new Promise((resolve, reject) => {

    let query = 'SELECT * FROM students WHERE collegeID = ?';
    let params = [collegeID];

    if (batch) {
      query += ' AND batch = ?';
      params.push(batch);
    }

    if (department) {
      query += ' AND department = ?';
      params.push(department);
    }

    if (section) {
      query += ' AND section = ?';
      params.push(section);   
    }

    if (semester) {
      query += ' AND sem = ?';  
      params.push(semester);
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






static getStudentByUid(uid,callback){

   const sql = "SELECT * FROM students WHERE firebase_uid=?";
   db.query(sql, [uid], callback);

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
