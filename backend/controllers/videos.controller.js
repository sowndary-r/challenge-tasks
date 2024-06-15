const logger = require('../logger.js')
const mongoose = require('mongoose')
const videos  = require('../models/videos.model.js')
/**
 * @method getChallenges get all the challenge videos
 * @param {*} req mandatory params: 
 * @param {*} res 
 * @returns 
 */

async function getChallenges(req,res){
    try{
        
        res.status(200).json({
            status: "success",
            data: "hello world!!!!"
          });
    }
    catch(err){
        logger.error("error in getting challenges "+err.message)
        return res.status(400).json({
            status: "failure",
            message: err.message,
          });
    }
}

/**
 * @method postChallenges upload challenge videos
 * @param {*} req mandatory params: 
 * @param {*} res 
 * @returns 
 */

async function postChallenges(req,res){
    try{
        let data = req.body.data;
        res.status(200).json({
            status: "success",
            message: "videos are posted successfully"
          });
    }
    catch(err){
        logger.error("error in posting challenges "+err.message)
        return res.status(400).json({
            status: "failure",
            message: err.message,
          });
    }
}

module.exports = {
    getChallenges,
    postChallenges
};