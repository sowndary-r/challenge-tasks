const express = require('express')

const videoRoutes = require('../controllers/videos.controller.js')

const userInfoRoutes = require('../controllers/userInfo.controller.js')

/* Route specific middleware */
const router = express.Router(); 

router
  .route('/challenges')
  .post(videoRoutes.postChallenges) 
  .get(videoRoutes.getChallenges);  

router
  .route('/users')
  .post(userInfoRoutes.insertChallengers); 

  module.exports = router;