const express = require('express');
require('dotenv').config();
const Sequelize = require('sequelize')
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('./logger.js')
const challengeRoutes = require('./routes/challenge.route.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// db configuration
const dbUrl = process.env.DB_CON || 'mysql://root:root1234@localhost:3306/challenge';
const sequelize = new Sequelize(dbUrl)
sequelize
   .authenticate()
   .then(() => {
      logger.info('Successfully connected to the db');
   })
   .catch(err => {
      logger.error("Unable to connect to the database " + err);
      process.exit();
   }); 

  //routes
  app.use('/api/v1/',challengeRoutes);

  app.get("/test", (req, res) => {
    logger.info("Handling /test request");
    return res.status(200).json("Hello World");
  });

app.listen(PORT, () => {
    logger.info(`Web Server running on port ${PORT}`)
  })
  
