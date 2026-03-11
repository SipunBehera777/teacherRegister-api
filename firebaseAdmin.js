require("dotenv").config();

const admin = require("firebase-admin");

const serviceAccount = require("./Config/studentattendance-4898a-firebase-adminsdk-fbsvc-1111b339c2.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;