const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const info = new Schema({
    type:{
        type: String,
        enum: ["terms" , "privacy" , "risk"],
        required: true,
    },
    InfoHtml: {
        type: String,
        required: true,
    },

},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Info', info);