const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api', dashboardRoutes);

    
app.get('/' , (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT${PORT}`)
})
