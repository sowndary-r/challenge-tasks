const logger = require('../logger.js')
const { insertUserInfo }  = require('../models/userInfo.model.js')

/**
 * @method getChallenges insert all the challengers
 * @param {*} req mandatory params:  
 * @param {*} res 
 * @returns 
 */

async function insertChallengers(req,res){
    try{
        let challengers = req.body.challengers;
         for(let name of challengers){
            let data = {
                "userName" : name
            };
            await insertUserInfo(data);
         }
        res.status(200).json({
            status: "success",
            message: "challengers are added successfully"
          });
    }
    catch(err){
        logger.error("error in adding challenges "+err.message)
        return res.status(400).json({
            status: "failure",
            message: err.message,
          });
    }
}

module.exports = {
    insertChallengers
}