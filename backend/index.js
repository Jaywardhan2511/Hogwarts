const connectDB = require('./config/db');
const express = require("express");
const app = express();

app.use(express.json());

app.use('/api/students', require('./routes/studentRoutes'));

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});