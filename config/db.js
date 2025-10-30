const mongoose = require('mongoose');

async function connectDB() {
    try {
        console.log("📡 Trying to connect to MongoDB..."); 
        await mongoose.connect("mongodb+srv://irtizarizvi88:02zvyVzgQjOD3KJV@cluster0.5lqz4g2.mongodb.net/?appName=Cluster0");
        console.log("✅ MongoDB connected successfully")
    } catch (err) {
        console.log("❌ Database connection error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;