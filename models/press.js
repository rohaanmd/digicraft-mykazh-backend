const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const press = new Schema({

    title: String,
    image: String,
    bio: String,
    publishedAt: Date,
    link: String,

},{timestamps:true});

module.exports  = mongoose.model("Press",press);