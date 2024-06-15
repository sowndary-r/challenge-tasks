const mongoose = require('mongoose')

const videoSchema =  new mongoose.Schema({
     userId : { type: Number },
     date : { type: Date },
     video : { type: String, default: null }
},
{
    timestamps: true,
});

module.exports = mongoose.model('videos', videoSchema);