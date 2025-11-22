const mongoose = require('mongoose');
require('dotenv').config();

// define the mongoose connection URL
const mongoURL = "mongodb://localhost:27017/hotels";  // replace 'hotels' with your database name
//const mongoURL = process.env.mongodb_URL;

// set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// get default connection
const db = mongoose.connection;

// define event listeners for database connection
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// export the database connection
module.exports = db;
