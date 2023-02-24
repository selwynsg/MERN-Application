const mongoose = require('mongoose');


const subSchema = new mongoose.Schema({
name:{
    type: String,
    required: true
},

height: {
    type: String,
    required: true
},

age: {
    type: Number,
    required: true,
    },
Player: {
        type: String,
        required: false,
    },
collage: {
        type: String,
        required: false,
    },
weight: {
        type: String,
        required: false,
    }
})

//allows to interact with database simply using schema. 
module.exports = mongoose.model('sub',subSchema)