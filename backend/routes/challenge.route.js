const express = require('express')

const videoRoutes = require('../controllers/videos.controller.js')

const userInfoRoutes = require('../controllers/userInfo.controller.js')

/* Route specific middleware */
const router = express.Router(); 

router
  .route('/getAllChallenges')
  .get(videoRoutes.getChallenges)

router
  .route('/uploadChallenges')
  .post(videoRoutes.postChallenges)

router
  .route('/users')
  .post(userInfoRoutes.insertChallengers)

  module.exports = router;