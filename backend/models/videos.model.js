const Sequelize = require('sequelize');
const dbUrl = 'mysql://root:root1234@localhost:3306/challenge';
const sequelize = new Sequelize(dbUrl)
const { QueryTypes, Op } = Sequelize; 
const logger = require('../logger.js')
const Videos = sequelize.define('videos', {
    id:{
		type: Sequelize.INTEGER,  
		autoIncrement:true,
		allowNull:false,
		primaryKey:true
   },
	userId : Sequelize.INTEGER,
    userName : Sequelize.STRING,
    video : Sequelize.STRING,
    date : Sequelize.DATE
},{
	tableName: 'videos',
	timestamps: false 
});

module.exports = Videos;


async function insertVideos(data){
    try{
        const resp = await Videos.create(data, {logging: false});
        return resp;
    }
    catch(err){
        logger.error("error inserting into videos table "+err.stack)
        return null;
    }
}
async function getVideos(date){
    try{
        const resp = await sequelize.query(`SELECT * from videos v join userInfo i on i.id = v.userId where uploadedDate = :date`, { 
			logging: false,
			plain: false, 
			raw: false, 
			type: QueryTypes.SELECT, 
			replacements: { 'date' : date },
		}); 
        return resp;
    }
    catch(err){
        logger.error("error getting data from videos table "+err.stack)
        return null;
    }
}

module.exports = {
    insertVideos,
    getVideos
}