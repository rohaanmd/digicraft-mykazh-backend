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

    dealType:{
        exemption:{
            type: String,
            enum: ["regA","regB"]
    
        } ,
        equity:{
            PreMoneyEvaluation: Number
        },
        convertableNote:{
            termLength: Number,
            conversionDiscount:Number,
            intrest: Number,
            valuationCap:Number,
            warrantCoverage:Number,
        },
        safeNote:{
            valuationCap: Number,
            conversionDiscount:Number,
    
        },
        debt:{
            interest: Number,
            termLength: Number,
    
        },
        revenueShare:{
            return:Number,
            paymentFrequency:{
                type: String,
                enum: ["monthly","bimonthly","quarterly"]
            },
            MaxReturn:Number,
            return:{
                type: String,
                enum: ["profit","revenue"]
            },
            PaybackStartDate:
            {
                type: String,
                enum: ["Exact Date","Number Of Month Finance Close" ]
            }
    
    
        }
    
    
    },
    PreviousFunding:{
        source:    {
            type: String,
            enum: ["self","friemd","bank","investor", "grant", "other"]
        },
        fundingAmount:Number,
        fundingDate:Date,
    }
    
},
pitch:{
    highlight:[{type: String,}],
    elevatorPitch: String,
    investor:[
        {
            investorType: {
                type: String,
                enum: ["individual","institutional" ]
            },
            investorId:{
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]

},

docs:{
    ExecutiveSummary:{
        Doctype:{  
            type: String,
            enum: ["public","confidential"],
        },
        fileUrl : String,
    },
    termSheet:{
        Doctype:{  
            type: String,
            enum: ["public","confidential"],
        },
        fileUrl : String,
    
    },
    additionalDoc: {
        Doctype: String,    
        fileUrl : String,
    },

},

risk:String,



});

module.exports = mongoose.model("business", BusinessSchema);
