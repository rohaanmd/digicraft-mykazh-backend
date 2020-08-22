const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    comanyName: {
        type: String,
        required: true,
    },
    companyOverview: {
        type: String,
        required: true,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    location: {
        country: {
            type: String,
            required: true,
        },
        city: String,
    },
    company_tagline: String,
    company_keyword: String,
    email: String,
    website: String,
    mobile: Number,
    linkedin: String,
    facebook: String,
    twitter: String,
    logo: {
        type: String,
        required: true,
    },

    featuredImg: {
        type: String,
    },
    video: {
        type: String,
    },
    youtubeUrls: [
        {
            url: String,
        },
    ],
    testimonials: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            role: String,
            quote: String,
        },
    ],

    traction: [
        {
            date: Date,
            about: String,
        },
    ],
    faq:[
        {
            question: String,
            answer: String,
        }
    ],
fundraising:{
    visibility:{
        type: String,
        required: true,
        enum:["private","public"],
    },
    goal: Number,
    maxAmount: Number,
    minAmount: Number,
    stage:{
        type:String,
        required:true,
        enum: ["pre-seed","seed","BridgeToSeriesA","SeriesA","BridgeToSeriesB","SeriesB","others"],
    },
    closingDate:Date,
    currentlyFunding: {
        type: Boolean,
                required:true,
                default: false,
    },
if()

}

});

module.exports = mongoose.model("business", BusinessSchema);
