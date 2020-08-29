const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faq = new Schema({
    type:{
        type: String,
        enum: ["knowledge" , "investor" , "entrepreneur"],
        required: true,
    },
    faq: {
     question: String, 
     answer: String,
    }

},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Faq', faq);