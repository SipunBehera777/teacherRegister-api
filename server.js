

const express = require("express");
const cors = require("cors");
require("dotenv").config(); 


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const teacherRoutes = require("./Router/teacherRoutes");






app.use("/api/teachers", teacherRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
