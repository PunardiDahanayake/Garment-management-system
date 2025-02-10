const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("MongoDB connected");
};


module.exports = connectDB;

