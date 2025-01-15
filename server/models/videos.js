const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    file_url:{  
        type:String,
        required:true  
    },
    caption_url: {
        type: String,
        default: null
    },
})

module.exports =  mongoose.model('Video', videoSchema);