const mongoose = require('mongoose');


const infoSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    }
    
});

//allows to interact with database simply using schema. 
module.exports = mongoose.model('info', infoSchema);