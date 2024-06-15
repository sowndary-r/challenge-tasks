const express = require('express')

const challengeRoutes = require('../controllers/challenges.controller')

/* Route specific middleware */
const router = express.Router(); 

router
  .route('/getAllChallenges')
  .get(challengeRoutes.getChallenges)

  router
  .route('/uploadChallenges')
  .post(challengeRoutes.postChallenges)

  module.exports = router;