const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('./logger.js')
const challengeRoutes = require('./routes/challenge.route.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// db configuration
const dbUrl = process.env.DB_CON || 'mongodb://localhost:27017/challenges';
const mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(dbUrl, mongooseConfig)
  .then(() => {
    logger.info(">Successfully connected to the db<");
  })
  .catch((err) => {
    logger.error("Could not connect to the database. Exiting." + err.message);
    process.exit();
  });

  //routes
  app.use('/api/v1/challenge',challengeRoutes);

  app.get("/test", (req, res) => {
    logger.info("Handling /test request");
    return res.status(200).json("Hello World");
  });

app.listen(PORT, () => {
    logger.info(`Web Server running on port ${PORT}`)
  })
  
