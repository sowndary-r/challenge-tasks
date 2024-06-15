const mongoose = require('mongoose')

const userInfoSchema =  new mongoose.Schema({
     Id : { type: Number },
     userName : { type: String }
},
{
    timestamps: true,
});

module.exports = mongoose.model('userInfo', userInfoSchema);