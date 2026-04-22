require('dotenv').config();
const connectDB = require('./config/db');
const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require('./routes/teacherRoutes');

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});