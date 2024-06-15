const logger = require('../logger.js')
const mongoose = require('mongoose')
const userInfo  = require('../models/userInfo.model.js')

/**
 * @method getChallenges insert all the challengers
 * @param {*} req mandatory params:  
 * @param {*} res 
 * @returns 
 */

async function insertChallengers(req,res){
    try{
        let challengers = req.body.challengers;
        const documents = challengers.map((name)=>({
           userName : name
        }));

        const resp = await userInfo.insertMany(documents);
        logger.info("challengers are added successfully "+ resp)
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

module.exports = {insertChallengers}