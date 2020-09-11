const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    verification:{
      type: String,
      enum: ["approved","disapproved","NULL"]
      ,default:"NULL"
    }
    ,
    companyName: {
      type: String,
      // required: true,
    },
    companyOverview: {
      type: String,
      // required: true,
    },
    companyLogo: { type:String },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    customContentInput: String,
    customContentTextarea: String,
    location: {
      country: {
        type: String,
        // required: true,
      },
      stateAndCity: String,
    },
    press: String,

    companyTagline: String,
    companyKeyword: String,
    email: String,
    canSms: Boolean,
    
    conatctPhone: Number,
    linkedinURL: String,
    facebookURL: String,
    twitterURL: String,
    url: {
      type: String,
      // required: true,
    },
    team: [
      { 
        
        level: Boolean,
        visible: Boolean,
        role: String,
        name: String,
        photo:String,
        bio:String
      },
    ],
    kpi: [
      {
        option: Number,
        role: String,
        text: String,
      },
    ],

    featuredImg: {
      type: String,
    },
    video: {
      type: String,
    },
    youtubeUrls: String,
    test: [
      {
        name: {
          type: String,
        },
        role: String,
        text: String,
        testphoto:String
      },
    ],

    traction: [
      {
        date: Date,
        text: String,
      },
    ],
    qus: [
      {
        qus: String,
        ans: String,
      },
    ],

    CampaignVisibility: {
      type: String,
      // required: true,
      enum: ["private", "public"],
    },
    goal: Number,
    MaximumInvestmentAmount: Number,
    MinimumInvestmentAmount: Number,
    deal_stage: {
      type: Number,
      // type: String,
      // required: true,
      // enum: ["pre-seed", "seed", "BridgeToSeriesA", "SeriesA", "BridgeToSeriesB", "SeriesB", "others"],
    },
    ClosingDate: Date,
    currentlyFunding: {
      type: Boolean,
      // required: true,
      default: false,
    },

    ExemptionType: {
      type: String,
      // enum: ["regA", "regB"]
    },
    equity: {
      PreMoneyEvaluation: Number,
    },

    TermLength: Number,
    ConversionDiscount: Number,
    Intrest: Number,
    ValuationCap: Number,
    WarrantCoverage: Number,
    return: Number,
    PaymentFrequency: {
      type: Number,
      // type: String,
      // enum: ["monthly", "bimonthly", "quarterly"]
    },
    MaximumReturn: Number,
    ReturnType: {
      type: Number,
      // type: String,
      // enum: ["profit", "revenue"]
    },
    PaybackStartDate: {
      type: String,
      enum: ["Exact Date", "Number Of Month Finance Close"],
    },

    FundingSource: {
      type: Number,
      // type: String,
      // enum: ["self", "friemd", "bank", "investor", "grant", "other"]
    },
    FundingAmount: Number,
    FundingDate: Date,
    FundingType: Number,

    dealHighligths: [{ highlight: String }],
    ElevatorPitch: String,
    investor: [
      {
        InvestorType: {
          type: Number,
          // type: String,
          // enum: ["individual", "institutional"]
        },
        InvestorName: {
          type: String,
        },
        InvestorImage:{
          type:String
        },
        Investorbio:String
      
      },
    ],
    ExecutiveSummaryToogle: Boolean,
    TermSheetToogle: Boolean,
    AdditionalToogle: Boolean,

    docs: {
      executiveSummary: {
        Doctype: {
          type: String,
          enum: ["public", "confidential"],
        },
        fileUrl: String,
      },
      termSheet: {
        Doctype: {
          type: String,
          enum: ["public", "confidential"],
        },
        fileUrl: String,
      },
      additionalDoc: {
        Doctype: String,
        fileUrl: String,
      },
     
    },
    sideshareURL:String,
    PreMoneyValuation:Number,
    fundraisingGoal:Number,
    DateRoundOpened:Date,
    websiteURL:String,
    AmountRaised:{
      type:Number,
      default:0,
    },
    tranctionDate:Date,



    RisksDisclosures: String,
    Risk:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("business", BusinessSchema);
