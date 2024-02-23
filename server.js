const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/databaseConfig');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User'); // Import UserRoute

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(dbConfig.url, {
     useNewUrlParser: true,
     useUnifiedTopology: true, // Added for deprecation warning
}).then(() => {
    console.log("Database Connected Successfully!!");
    // Start the server after successful database connection
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit(1); // Exiting the process if unable to connect to the database
});

// Use UserRoute
app.use('/user', UserRoute);

module.exports = app;
