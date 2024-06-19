const logger = require('../logger.js')
const moment = require('moment-timezone')
const { insertVideos, getVideos} = require('../models/videos.model.js')

/**
 * @method getChallenges get all the challenge videos
 * @param {*} req mandatory params: date
 * @param {*} res 
 * @returns 
 */

async function getChallenges(req,res){
    try{
        let date = req.query.date;

        if(!date){
            res.status(500).json({
                status: "Failure",
                message: "dates are mandatory"
              });
        }
        const formattedDate = moment(date).format('YYYY-MM-DD');
        let data = await getVideos(formattedDate)
        res.status(200).json({
            status: "success",
            data: data
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
 * @param {*} req mandatory params: userId,mame,video,uploadeddate
 * @param {*} res 
 * @returns 
 */

async function postChallenges(req,res){
    try{
        let {date, videos} = req.body;
        const formattedDate = moment(date).format('YYYY-MM-DD');
       for(let data of videos){
        let document = {
            "userId" : data.id,
            "video" : data.video,
            "uploadedDate" : formattedDate
        }
         await insertVideos(document)
       }
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