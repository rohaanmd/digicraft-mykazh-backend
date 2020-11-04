const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teams = new Schema({
    type:String,
    data:[
        {
            photo:String,
            name:String,
            bio:String
        }
    ]

},{timestamps:true});

module.exports  = mongoose.model("Teams",teams);
