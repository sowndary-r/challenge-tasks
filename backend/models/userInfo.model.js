const logger = require('../logger.js')
const Sequelize = require('sequelize');
const dbUrl = 'mysql://root:root1234@localhost:3306/challenge';
const sequelize = new Sequelize(dbUrl)
const { QueryTypes, Op } = Sequelize; 
const userInfo = sequelize.define('userInfo', {
    id:{
		type: Sequelize.INTEGER,  
		autoIncrement:true,
		allowNull:false,
		primaryKey:true
   },
    userName : Sequelize.STRING,
},{
	tableName: 'userInfo',
	timestamps: false 
});
module.exports = userInfo ;

async function insertUserInfo(data){
    try{
        const resp = await userInfo.create(data, {logging: false});
        return resp;
    }
    catch(err){
        logger.error("error inserting into userInfo table "+err.stack)
        return null;
    }
}
async function getUserInfo(data){
    try{
        const resp = await sequelize.query('select id,userName from userInfo', {logging: false});
        return resp;
    }
    catch(err){
        logger.error("error getting data from userInfo table "+err.stack)
        return null;
    }
}
module.exports = {
    insertUserInfo,
    getUserInfo
}