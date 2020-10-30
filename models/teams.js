const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teams = new Schema({

    title: String,
    image: String,
    bio: String,
    publishedAt: Date,
    link: String,

});

module.exports  = mongoose.model("Teams",teams);