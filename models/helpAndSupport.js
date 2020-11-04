const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const helpSupport = new Schema({
    type: String,
    paragraph:String,
    subHeadings: [{
        heading: String,
        data: [{
            question: String,
            answer: String,
        }]
    }],


},{timestamps:true});

module.exports  = mongoose.model("helpSupport",helpSupport);
